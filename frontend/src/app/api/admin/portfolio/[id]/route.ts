import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { PortfolioUpdateSchema } from "@/validators";
import { z } from "zod";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: (await context.params).id },
      include: { category: true, technologies: true, media: true },
    });
    
    if (!project || project.deletedAt) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const data = PortfolioUpdateSchema.parse(body);

    const project = await prisma.project.update({
      where: { id: (await context.params).id },
      data,
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await prisma.project.update({
      where: { id: (await context.params).id },
      data: { deletedAt: new Date() }, // Soft delete
    });
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
