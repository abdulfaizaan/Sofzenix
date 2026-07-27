import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { SiteSettingUpdateSchema } from "@/validators";
import { z } from "zod";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json({ data: settings });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, ...data } = z.object({
      key: z.string().min(1),
      value: z.string().min(1),
      description: z.string().optional(),
    }).parse(body);

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: data,
      create: { key, ...data },
    });

    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
