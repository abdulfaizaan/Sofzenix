import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "asc" },
      include: { seo: true },
    });
    return NextResponse.json({ data: services });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
