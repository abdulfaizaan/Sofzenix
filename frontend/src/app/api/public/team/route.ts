import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

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
