import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    // Only fetch specific safe, public-facing settings
    // If you need all settings to be public, you can fetch all,
    // but typically only certain keys like "CONTACT_EMAIL", "SOCIAL_LINKS", etc., are needed on the frontend.
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json({ data: settings });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
