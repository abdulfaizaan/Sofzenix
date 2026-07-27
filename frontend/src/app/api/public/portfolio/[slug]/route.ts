import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: (await context.params).slug },
      include: { category: true, technologies: true, media: true, seo: true },
    });

    if (!project || project.deletedAt) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: project });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
