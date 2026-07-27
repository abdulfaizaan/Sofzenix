import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/shared/lib/prisma';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

async function handler(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message, leadId } = body;

    // Send the email via Resend
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: "New Contact Request: ${service || 'General Inquiry'}",
      text: "Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}",
    });

    if (leadId) {
      await prisma.lead.update({
        where: { id: leadId },
        data: { status: 'IN_PROGRESS' }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to process email job:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler, {
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || "dummy",
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || "dummy",
});
