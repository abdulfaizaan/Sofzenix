import { NextResponse } from "next/server";
import { clearAuthCookie, getAuthUser } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      // Delete session from DB
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    await clearAuthCookie();

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
