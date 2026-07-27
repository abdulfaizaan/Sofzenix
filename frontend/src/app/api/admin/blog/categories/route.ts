import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { BlogCategoryCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ data: categories });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = BlogCategoryCreateSchema.parse(body);

    const category = await prisma.blogCategory.create({ data });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
