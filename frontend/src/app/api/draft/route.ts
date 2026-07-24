import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = request.nextUrl.searchParams.get('slug') || '';
  const type = request.nextUrl.searchParams.get('type') || 'blog'; // blog, portfolio, services

  // Validate the secret
  if (secret !== process.env.CMS_PREVIEW_SECRET) {
    log.warn("draft", "Invalid preview mode secret", { ip: request.headers.get("x-forwarded-for") });
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path based on the content type
  let redirectPath = '/';
  if (slug) {
    switch (type) {
      case 'blog':
        redirectPath = `/blog/${slug}`;
        break;
      case 'portfolio':
        redirectPath = `/portfolio/${slug}`;
        break;
      case 'services':
        redirectPath = `/services/${slug}`;
        break;
      default:
        redirectPath = `/${slug}`;
    }
  }
  
  log.info("draft", `Draft mode enabled for ${type}: ${slug}`);

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
