import type { MetadataRoute } from "next";
import { SITE } from "@/shared/constants/site";
import { NAV_LINKS } from "@/shared/constants/nav";
import { getProjects } from "@/shared/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  
  // Fetch dynamic projects
  const projects = await getProjects().catch(() => []);

  const projectUrls = projects.map((project: any) => ({
    url: `${SITE.url}/work/${project.slug.current}`,
    lastModified: project._updatedAt || now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Fetch blog tags from backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  let tags: any[] = [];
  try {
    const tagsRes = await fetch(`${apiUrl}/api/public/blog/tags`, {
      headers: {
        "x-frontend-key": process.env.NEXT_PUBLIC_FRONTEND_API_KEY || "default_dev_key_123"
      },
      next: { revalidate: 3600 }
    });
    if (tagsRes.ok) {
      const data = await tagsRes.json();
      tags = data.tags || [];
    }
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