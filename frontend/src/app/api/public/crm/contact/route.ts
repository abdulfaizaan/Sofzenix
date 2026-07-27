import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { ContactMessageCreateSchema } from "@/validators";
import { z } from "zod";
import { encrypt } from "@/shared/lib/encryption";
import { Client } from "@upstash/qstash";

const qstash = new Client({ token: process.env.QSTASH_TOKEN || "" });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = ContactMessageCreateSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        emailEncrypted: encrypt(data.email),
        service: data.service,
        message: data.message,
        status: "NEW",
      },
    });

    if (process.env.QSTASH_TOKEN) {
      // Create absolute URL for the webhook
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
      
      await qstash.publishJSON({
        url: `${baseUrl}/api/jobs/email`,
        body: {
          name: data.name,
          email: data.email,
          service: data.service,
          message: data.message,
          leadId: message.id
        }
      });
    }

    return NextResponse.json({ success: true, message: "Thank you for reaching out! We will get back to you soon." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
