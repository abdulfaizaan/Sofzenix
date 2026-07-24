import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/auth";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Routes that require authentication
const protectedPaths = ["/api/admin", "/admin"];

// Routes that require SUPER_ADMIN or ADMIN role
const adminOnlyPaths = ["/api/admin/users", "/api/admin/settings", "/api/admin/roles"];

// Routes that require EDITOR role to modify (POST, PUT, DELETE). VIEWER can only GET.
const contentPaths = ["/api/admin/content", "/api/admin/portfolio", "/api/admin/blog", "/api/admin/services", "/api/admin/media"];

// Initialize Upstash Redis Rate Limiter
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Check Public POST endpoints for Rate Limiting & API Key Verification
  if (request.method === "POST" && pathname.startsWith("/api/public/")) {
    // API Key Verification
    const providedKey = request.headers.get("x-frontend-key");
    const expectedKey = process.env.FRONTEND_API_KEY || "default_dev_key_123";
    
    if (providedKey !== expectedKey) {
      return NextResponse.json({ error: "Forbidden: Invalid API Key" }, { status: 403 });
    }

    // Rate Limiting Logic via Upstash
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown_ip";
    
    if (ratelimit) {
      const { success } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    } else {
      // Fallback for local development when Upstash is not configured
      console.warn("Upstash Redis not configured. Bypassing rate limiting for IP:", ip);
    }
  }

  // 2. Check if the current path requires authentication (Admin Routes)
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  
  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify the JWT
  const payload = await verifyJwt(token);

  if (!payload) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check RBAC for specific routes
  const isAdminPath = adminOnlyPaths.some((path) => pathname.startsWith(path));
  const isContentPath = contentPaths.some((path) => pathname.startsWith(path));
  
  const role = payload.role;
  const isSuperAdmin = role === "SUPER_ADMIN";
  const isAdmin = role === "ADMIN" || isSuperAdmin;
  const isEditor = role === "EDITOR" || isAdmin;
  const isViewer = role === "VIEWER";
  
  if (isAdminPath && !isAdmin) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Restrict write actions on content paths to Editor and above
  if (isContentPath) {
    const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(request.method);
    if (isWriteMethod && !isEditor) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden: Editor access required to modify content" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Add the user payload to headers so downstream API routes can access it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.userId);
  requestHeaders.set("x-user-role", payload.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
