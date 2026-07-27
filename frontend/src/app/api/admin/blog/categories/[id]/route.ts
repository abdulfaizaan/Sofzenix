import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { BlogCategoryUpdateSchema } from "@/validators";
import { z } from "zod";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const data = BlogCategoryUpdateSchema.parse(body);
    const category = await prisma.blogCategory.update({ where: { id: (await context.params).id }, data });
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await prisma.blogCategory.delete({ where: { id: (await context.params).id } });
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
