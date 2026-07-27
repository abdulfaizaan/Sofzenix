import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { TagUpdateSchema } from "@/validators";
import { z } from "zod";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const tag = await prisma.tag.findUnique({ where: { id: (await context.params).id } });
    if (!tag) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: tag });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const data = TagUpdateSchema.parse(body);
    const tag = await prisma.tag.update({ where: { id: (await context.params).id }, data });
    return NextResponse.json({ success: true, data: tag });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await prisma.tag.delete({ where: { id: (await context.params).id } });
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
