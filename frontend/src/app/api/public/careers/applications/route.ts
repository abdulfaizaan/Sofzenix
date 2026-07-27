import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { JobApplicationCreateSchema } from "@/validators";
import { z } from "zod";
import { encrypt } from "@/shared/lib/encryption";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = JobApplicationCreateSchema.parse(body);

    const job = await prisma.job.findUnique({ where: { id: data.jobId } });
    if (!job || !job.active || job.deletedAt) {
      return NextResponse.json({ error: "Job is no longer accepting applications" }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        jobId: data.jobId,
        firstName: data.firstName,
        lastName: data.lastName,
        emailEncrypted: encrypt(data.email),
        phoneEncrypted: data.phone ? encrypt(data.phone) : null,
        resumeUrl: data.resumeUrl,
        portfolio: data.portfolio,
        coverLetter: data.coverLetter,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, message: "Application submitted successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
