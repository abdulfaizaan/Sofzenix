import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { TeamMemberCreateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ data: team });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = TeamMemberCreateSchema.parse(body);

    const member = await prisma.teamMember.create({ data: data as any });
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
