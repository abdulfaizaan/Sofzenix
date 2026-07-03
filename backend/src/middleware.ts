import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/auth";

// Routes that require authentication
const protectedPaths = ["/api/admin", "/admin"];

// Routes that require SUPER_ADMIN or ADMIN role
const adminOnlyPaths = ["/api/admin/users", "/api/admin/settings"];

// In-memory rate limiting map (resets on cold boot in Edge runtime)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 POSTs per minute

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

    // Rate Limiting Logic
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown_ip";
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - limitRecord.lastReset > RATE_LIMIT_WINDOW_MS) {
      limitRecord.count = 0;
      limitRecord.lastReset = now;
    }

    if (limitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    limitRecord.count += 1;
    rateLimitMap.set(ip, limitRecord);
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
  
  if (isAdminPath && payload.role !== "SUPER_ADMIN" && payload.role !== "ADMIN") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
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
