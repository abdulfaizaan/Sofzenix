import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();
  
  log.info("draft", "Draft mode disabled");
  
  return NextResponse.redirect(new URL('/', request.url));
}
