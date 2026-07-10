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

    // Integrate 3rd party email service (Resend) to notify admin
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h3>New Message</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Service/Company:</strong> ${data.service}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, message: "Thank you for reaching out! We will get back to you soon." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
