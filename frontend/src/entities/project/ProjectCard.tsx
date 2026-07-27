import type * as React from "react";
import Image from "next/image";

import { cn } from "@/shared/utils/cn";
import type { Project } from "./project.types";

interface ProjectCardProps {
  readonly project: Project;
  readonly className?: string;
}



const accentBg = {
  accent: "bg-accent",
  secondary: "bg-accent-secondary",
} as const;

/**
 * Server-rendered project card.
 * Markup is what GSAP animates — no logic here.
 */
export function ProjectCard({ project, className }: ProjectCardProps): React.JSX.Element {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-6",
        className,
      )}
      data-project-card={project.id}
    >
      <div className="relative w-full flex-1 overflow-hidden bg-surface">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.5s] ease-out-expo group-hover:scale-[1.05]"
          priority={false}
        />
      </div>

      <div className="flex flex-col gap-2 px-2 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-text">
            {project.title}
          </h3>
          <span className="font-mono text-sm text-muted uppercase tracking-widest flex items-center gap-3">
            <span
              className={cn("h-1.5 w-1.5 rounded-full", accentBg[project.accent])}
              aria-hidden="true"
            />
            {project.category}
          </span>
        </div>
      </div>
    </article>
  );
}