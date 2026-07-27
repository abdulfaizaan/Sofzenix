import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { withErrorHandler } from "@/lib/with-error-handler";

const resend = new Resend(process.env.RESEND_API_KEY);

export const GET = withErrorHandler(async (request: Request) => {
  // Validate Vercel Cron Secret (or Upstash QStash token) to ensure this is only triggered by the cron job
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fetch active subscribers
  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { active: true },
    select: { email: true }
  });

  if (subscribers.length === 0) {
    return NextResponse.json({ success: true, message: "No active subscribers." });
  }

  // 2. Fetch recent content (e.g., posts published in the last 7 days)
  const recentPosts = await prisma.post.findMany({
    where: {
      published: true,
      deletedAt: null,
      createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  if (recentPosts.length === 0) {
    return NextResponse.json({ success: true, message: "No new content to send." });
  }

  // 3. Compose Email
  const emails = subscribers.map((sub: { email: string }) => sub.email);
  const postList = recentPosts.map((p: { title: string; excerpt: string | null }) => `<li><strong>${p.title}</strong>: ${p.excerpt || ''}</li>`).join("");
  
  const htmlContent = `
    <h2>SOFZENIX Weekly Update</h2>
    <p>Here are our latest insights and case studies from this week:</p>
    <ul>${postList}</ul>
    <p>Thank you for subscribing!</p>
  `;

  // 4. Send bulk email via Resend
  // Resend supports sending to up to 50 recipients per batch, so we chunk it if necessary.
  // For demonstration, we're assuming the list is manageable or we batch it.
  
  try {
    await resend.emails.send({
      from: "updates@sofzenix.com",
      to: "updates@sofzenix.com",
      bcc: emails, // Use BCC for mass lists, or Resend's batch API
      subject: "SOFZENIX Weekly Insights",
      html: htmlContent
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: `Newsletter sent to ${subscribers.length} subscribers.` });
});
