import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import type { NextRequest } from "next/server";

const EXPERIMENT_COOKIE = "ab-hero-variant";
const VARIANTS = ["a", "b"]; // 'a' is original, 'b' is variant

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en'
});

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // First, apply i18n routing
  const response = intlMiddleware(request);

  // Only apply A/B testing on the homepage (for any locale)
  const isHomepage = url.pathname === "/" || locales.some(l => url.pathname === `/${l}`);
  if (isHomepage) {
    let variant = request.cookies.get(EXPERIMENT_COOKIE)?.value;

    if (!variant || !VARIANTS.includes(variant)) {
      variant = Math.random() < 0.5 ? "a" : "b";
      response.cookies.set(EXPERIMENT_COOKIE, variant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "strict",
      });
    }
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
};
