import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categoryId = searchParams.get("category");
    const skip = (page - 1) * limit;

    const whereClause: any = { published: true, deletedAt: null };
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: { category: true, tags: true },
        skip,
        take: limit,
      }),
      prisma.post.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: posts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
