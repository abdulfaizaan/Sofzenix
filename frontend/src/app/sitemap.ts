import type { MetadataRoute } from "next";
import { SITE } from "@/shared/constants/site";
import { NAV_LINKS } from "@/shared/constants/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
  ];
}