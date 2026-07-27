import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/shared/lib/auth";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// --- Frontend Constants ---
const EXPERIMENT_COOKIE = "ab-hero-variant";
const VARIANTS = ["a", "b"]; // 'a' is original, 'b' is variant

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en'
});

// --- Backend Constants ---
const protectedPaths = ["/api/admin", "/admin"];
const adminOnlyPaths = ["/api/admin/users", "/api/admin/settings", "/api/admin/roles"];
const contentPaths = ["/api/admin/content", "/api/admin/portfolio", "/api/admin/blog", "/api/admin/services", "/api/admin/media"];

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
  const url = request.nextUrl;
  
  // 1. Rate Limiting
  const isPublicApi = pathname.startsWith("/api/public/");
  const isChatApi = pathname.startsWith("/api/chat");
  const isRateLimitedPath = isPublicApi || isChatApi;

  if (isRateLimitedPath) {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown_ip";
    if (ratelimit) {
      const { success } = await ratelimit.limit("ratelimit_$ip_$pathname");
      if (!success) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    }
  }

  // 2. Auth Logic (Admin Routes)
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (isProtected) {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyJwt(token);
    if (!payload) {
      if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAdminPath = adminOnlyPaths.some((path) => pathname.startsWith(path));
    const isContentPath = contentPaths.some((path) => pathname.startsWith(path));
    const role = payload.role;
    const isSuperAdmin = role === "SUPER_ADMIN";
    const isAdmin = role === "ADMIN" || isSuperAdmin;
    const isEditor = role === "EDITOR" || isAdmin;
    
    if (isAdminPath && !isAdmin) {
      if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (isContentPath) {
      const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(request.method);
      if (isWriteMethod && !isEditor) {
        if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Forbidden: Editor access required" }, { status: 403 });
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (ratelimit && pathname.startsWith("/api/admin")) {
      const { success } = await ratelimit.limit("auth_limit_$({payload.userId})");
      if (!success) return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-role", payload.role);

    if (pathname.startsWith("/api/") || pathname.startsWith("/admin")) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 3. Frontend: i18n & A/B Testing Logic
  const response = intlMiddleware(request);
  const isHomepage = url.pathname === "/" || locales.some(l => url.pathname === "/" + l);
  if (isHomepage) {
    let variant = request.cookies.get(EXPERIMENT_COOKIE)?.value;
    if (!variant || !VARIANTS.includes(variant)) {
      variant = Math.random() < 0.5 ? "a" : "b";
      response.cookies.set(EXPERIMENT_COOKIE, variant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "strict",
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images/).*)"],
};
