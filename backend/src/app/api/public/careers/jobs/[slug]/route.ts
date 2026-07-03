import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const job = await prisma.job.findUnique({
      where: { slug: (await context.params).slug },
    });

    if (!job || !job.active || job.deletedAt) {
      return NextResponse.json({ error: "Job not found or inactive" }, { status: 404 });
    }

    return NextResponse.json({ data: job });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
