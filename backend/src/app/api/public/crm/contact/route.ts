import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactMessageCreateSchema } from "@/validators";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = ContactMessageCreateSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        service: data.service,
        message: data.message,
        status: "NEW",
      },
    });

    // TODO: Integrate 3rd party email service (Resend/SendGrid) to notify admin here

    return NextResponse.json({ success: true, message: "Thank you for reaching out! We will get back to you soon." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
