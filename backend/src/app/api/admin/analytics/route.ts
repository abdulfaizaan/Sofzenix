import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandler } from "@/lib/with-error-handler";

export const GET = withErrorHandler(async () => {
  // Aggregate mock/real analytics
  const [totalProjects, totalPosts, totalTestimonials] = await Promise.all([
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.post.count({ where: { deletedAt: null } }),
    prisma.testimonial.count({ where: { deletedAt: null } })
  ]);

  return NextResponse.json({
    data: {
      metrics: [
        { label: "Total Projects", value: totalProjects, change: "+12%" },
        { label: "Published Posts", value: totalPosts, change: "+5%" },
        { label: "Client Testimonials", value: totalTestimonials, change: "+2" },
        { label: "Page Views (30d)", value: "12,450", change: "+18%" }
      ],
      recentActivity: [
        { action: "New Lead Captured", time: "2 mins ago" },
        { action: "Project 'Fintech App' Updated", time: "1 hour ago" },
        { action: "Newsletter Sent to 1,200 subs", time: "Yesterday" }
      ]
    }
  });
});
