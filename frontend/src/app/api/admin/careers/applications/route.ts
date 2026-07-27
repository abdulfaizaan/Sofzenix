import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const jobId = searchParams.get("jobId");
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (jobId) whereClause.jobId = jobId;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: { job: { select: { title: true } } },
        skip,
        take: limit,
      }),
      prisma.application.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: applications,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
