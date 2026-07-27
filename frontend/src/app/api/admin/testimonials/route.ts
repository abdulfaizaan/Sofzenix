import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { TestimonialCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: testimonials });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = TestimonialCreateSchema.parse(body);

    const testimonial = await prisma.testimonial.create({ data });
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
