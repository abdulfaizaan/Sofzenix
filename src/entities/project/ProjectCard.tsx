import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import type { Project } from "./project.types";

interface ProjectCardProps {
  readonly project: Project;
  readonly className?: string;
}

const accentText = {
  accent: "text-accent",
  secondary: "text-accent-secondary",
} as const;

const accentBg = {
  accent: "bg-accent",
  secondary: "bg-accent-secondary",
} as const;

/**
 * Server-rendered project card.
 * Markup is what GSAP animates — no logic here.
 */
export function ProjectCard({ project, className }: ProjectCardProps): JSX.Element {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
      data-project-card={project.id}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          priority={false}
        />

        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-xs uppercase tracking-widest text-text backdrop-blur-md">
          <span
            className={cn("h-1.5 w-1.5 rounded-full", accentBg[project.accent])}
            aria-hidden="true"
          />
          {project.category}
        </div>

        <span className="absolute right-6 top-6 font-mono text-xs text-muted">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-8 md:p-10">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-sm text-muted">{project.index}</span>
          <span className="font-mono text-sm text-muted">{project.client}</span>
        </div>

        <h3 className="font-display text-h3 font-medium leading-[1.05] tracking-tight text-text md:text-[2.5rem]">
          {project.title}
        </h3>

        <p className="max-w-prose text-body text-muted">{project.summary}</p>

        <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-border pt-6">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                {metric.label}
              </dt>
              <dd
                className={cn(
                  "font-display text-2xl font-medium leading-none",
                  accentText[project.accent],
                )}
              >
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 text-small text-text transition-colors hover:text-accent"
          aria-label={`Read the ${project.title} case study`}
        >
          Read case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}