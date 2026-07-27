import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: { where: { published: true, deletedAt: null } } },
        },
      },
    });
    return NextResponse.json({ data: categories });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
