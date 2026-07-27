import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { TagCreateSchema } from "@/validators";
import { withErrorHandler } from "@/shared/lib/with-error-handler";

export const GET = withErrorHandler(async () => {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ data: tags });
});

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json();
  const data = TagCreateSchema.parse(body);

  const tag = await prisma.tag.create({ data });
  return NextResponse.json({ success: true, data: tag }, { status: 201 });
});
