import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { ServiceUpdateSchema } from "@/validators";
import { z } from "zod";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: (await context.params).id },
    });
    if (!service || service.deletedAt) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ data: service });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const data = ServiceUpdateSchema.parse(body);
    const service = await prisma.service.update({ where: { id: (await context.params).id }, data });
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await prisma.service.update({ where: { id: (await context.params).id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
