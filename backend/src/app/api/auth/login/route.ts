import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { comparePasswords, signJwt, setAuthCookie } from "@/lib/auth";
import { LoginSchema } from "@/validators";
import * as speakeasy from "speakeasy";
import { log } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, token: totpToken } = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.deletedAt) {
      log.warn("auth", `Failed login attempt for email: ${email}`);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePasswords(password, user.passwordHash);
    
    if (!isValid) {
      log.warn("auth", `Invalid password for user: ${user.id}`);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2FA check
    if (user.twoFactorSecret) {
      if (!totpToken) {
        return NextResponse.json({ error: "2FA token required", require2FA: true }, { status: 403 });
      }
      
      const isValidTotp = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: totpToken,
      });
      
      if (!isValidTotp) {
        log.warn("auth", `Invalid 2FA token for user: ${user.id}`);
        return NextResponse.json({ error: "Invalid 2FA token" }, { status: 401 });
      }
    }

    // Generate JWT
    const token = await signJwt(user.id, user.role);

    // Save session in DB
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Capture IP and User Agent for audit
    const ipAddress = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Set secure HTTP-only cookie
    await setAuthCookie(token);

    log.info("auth", `Successful login for user: ${user.id}`);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    log.error("auth", "Login internal server error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
