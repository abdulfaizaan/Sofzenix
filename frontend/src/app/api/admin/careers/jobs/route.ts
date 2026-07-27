import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { JobCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { applications: true } },
      },
    });
    return NextResponse.json({ data: jobs });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = JobCreateSchema.parse(body);

    const job = await prisma.job.create({ data });
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
