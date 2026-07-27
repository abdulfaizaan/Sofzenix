import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { BlogPostCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        include: { category: true, tags: true },
        skip,
        take: limit,
      }),
      prisma.post.count({ where: { deletedAt: null } }),
    ]);

    return NextResponse.json({
      data: posts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = BlogPostCreateSchema.parse(body);

    const post = await prisma.post.create({ data });
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
