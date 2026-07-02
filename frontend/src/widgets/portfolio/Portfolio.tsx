import type * as React from "react";
import { PortfolioStage } from "./PortfolioStage";
import { getProjects } from "@/shared/lib/sanity/queries";
import type { Project, ProjectCategory } from "@/entities/project/project.types";

/**
 * Public Portfolio widget.
 * Server wrapper around the client orchestrator.
 */
export async function Portfolio(): Promise<React.JSX.Element> {
  let sanityProjects: any[] = [];
  try {
    sanityProjects = await getProjects();
  } catch (err) {
    console.error("Failed to fetch Sanity projects:", err);
  }

  // Map Sanity schema to frontend Project interface
  const projects: Project[] = sanityProjects.map((p, i) => ({
    id: p._id,
    slug: p.slug?.current || p._id,
    index: `0${i + 1}`,
    title: p.title,
    client: p.client || "Client",
    year: p.year || "2024",
    category: (p.category as ProjectCategory) || "Platform",
    summary: p.summary || "",
    image: {
      src: p.mainImage ? p.mainImage.asset._ref : "/images/placeholder.jpg",
      alt: p.title,
    },
    metrics: p.metrics || [],
    accent: i % 2 === 0 ? "accent" : "secondary",
  }));

  return <PortfolioStage projects={projects} />;
}