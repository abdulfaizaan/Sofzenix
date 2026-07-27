import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { log } from '@/shared/lib/logger';

/**
 * Enterprise ISR Webhook Endpoint
 * Allows headless CMS or backend services to trigger on-demand Incremental Static Regeneration (ISR).
 * Secures the endpoint using a secret token.
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');

    // 1. Authenticate the Webhook
    if (secret !== process.env.CMS_WEBHOOK_SECRET) {
      log.warn("isr", "Unauthorized revalidation attempt", { ip: request.headers.get("x-forwarded-for") });
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const tag = body?.tag || request.nextUrl.searchParams.get('tag');
    const path = body?.path || request.nextUrl.searchParams.get('path');

    // 2. Execute Revalidation
    if (tag) {
      revalidateTag(tag);
      log.info("isr", `Revalidated tag: ${tag}`);
      return NextResponse.json({ revalidated: true, now: Date.now(), tag });
    }

    if (path) {
      revalidatePath(path);
      log.info("isr", `Revalidated path: ${path}`);
      return NextResponse.json({ revalidated: true, now: Date.now(), path });
    }

    // If neither tag nor path is provided
    return NextResponse.json({ message: 'Missing path or tag for revalidation' }, { status: 400 });
  } catch (err) {
    log.error("isr", "Error handling revalidation webhook", err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
