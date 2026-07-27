import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: (await context.params).slug },
      include: { category: true, tags: true, seo: true },
    });

    if (!post || !post.published || post.deletedAt) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
