import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BlogPostUpdateSchema } from "@/validators";
import { z } from "zod";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: (await context.params).id },
      include: { category: true, tags: true, seo: true },
    });
    if (!post || post.deletedAt) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: post });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const data = BlogPostUpdateSchema.parse(body);
    const post = await prisma.post.update({ where: { id: (await context.params).id }, data });
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await prisma.post.update({ where: { id: (await context.params).id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
