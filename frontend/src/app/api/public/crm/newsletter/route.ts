import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { NewsletterSubscribeSchema } from "@/validators";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = NewsletterSubscribeSchema.parse(body);

    // Use upsert so if they already exist, we just ensure they are active
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: data.email },
      update: { active: true },
      create: { email: data.email, active: true },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
