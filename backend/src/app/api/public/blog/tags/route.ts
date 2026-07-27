import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchWithCache } from "@/lib/cache";

export async function GET() {
  try {
    const tags = await fetchWithCache(
      "public_blog_tags",
      async () => {
        return prisma.tag.findMany({
          orderBy: { name: "asc" },
          include: {
            _count: {
              select: { posts: true },
            },
          },
        });
      },
      3600 // Cache for 1 hour
    );

    return NextResponse.json({ data: tags });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
