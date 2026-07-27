import { NextResponse } from "next/server";
import { getAuthUser } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const payload = await getAuthUser();

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Auth status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
