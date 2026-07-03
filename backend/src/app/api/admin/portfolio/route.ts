import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PortfolioCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { category: true, technologies: true },
    });
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error("Fetch portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = PortfolioCreateSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        client: data.client,
        completedAt: data.completedAt,
        featured: data.featured,
        results: data.results,
        categoryId: data.categoryId,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    console.error("Create portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
