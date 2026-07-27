import type { MetadataRoute } from "next";
import { SITE } from "@/shared/constants/site";
import { NAV_LINKS } from "@/shared/constants/nav";
import { getProjects } from "@/shared/lib/sanity/queries";
import { prisma } from "@/shared/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  
  const projects = await getProjects().catch(() => []);

  const projectUrls = projects.map((project: any) => ({
    url: `${SITE.url}/work/${project.slug.current}`,
    lastModified: project._updatedAt || now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  let tags: any[] = [];
  try {
    tags = await prisma.tag.findMany({ select: { slug: true, createdAt: true } });
  } catch (error) {
    console.error("Failed to fetch blog tags for sitemap:", error);
  }

  const tagUrls = tags.map((tag: any) => ({
    url: `${SITE.url}/blog/tags/${tag.slug}`,
    lastModified: tag.createdAt ? new Date(tag.createdAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...NAV_LINKS.map((link) => ({
      url: `${SITE.url}${link.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projectUrls,
    ...tagUrls
  ];
}
