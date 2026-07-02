import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type HeadingLevel = "hero" | "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  readonly as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  readonly level?: HeadingLevel;
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly tone?: "default" | "muted" | "accent";
}

const levelClass: Record<HeadingLevel, string> = {
  hero: "text-hero font-display font-medium tracking-[-0.04em]",
  h1: "text-h1 font-display font-medium tracking-[-0.03em]",
  h2: "text-h2 font-display font-medium tracking-[-0.02em]",
  h3: "text-h3 font-display font-medium tracking-[-0.01em]",
  h4: "text-2xl font-display font-medium",
};

const toneClass = {
  default: "text-text",
  muted: "text-muted",
  accent: "text-accent",
};

/**
 * Semantic heading with display-style typography.
 * `level` controls typography scale; `as` controls the rendered element.
 */
export function Heading({
  as,
  level = "h2",
  children,
  className,
  id,
  tone = "default",
}: HeadingProps): React.JSX.Element {
  const inferredTag: ElementType = as ?? (level === "hero" ? "h1" : level);
  const Tag = inferredTag;

  return createElement(
    Tag,
    { id, className: cn(levelClass[level], toneClass[tone], className) },
    children
  );
}