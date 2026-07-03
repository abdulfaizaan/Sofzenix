import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ServiceCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: services });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = ServiceCreateSchema.parse(body);

    const service = await prisma.service.create({ data });
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
