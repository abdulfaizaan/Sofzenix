"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ContactStatus } from "@prisma/client";

export async function updateLeadStatus(id: string, status: ContactStatus) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateMessageStatus(id: string, status: ContactStatus) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
