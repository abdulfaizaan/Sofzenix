import type * as React from "react";
import { cn } from "@/shared/utils/cn";
import type { Stat } from "./stat.data";

interface StatCardProps {
  readonly stat: Stat;
  readonly className?: string;
}

/**
 * Server-rendered stat card.
 * Pure presentation — animation is handled by FloatingStat when needed.
 */
export function StatCard({ stat, className }: StatCardProps): React.JSX.Element {
  const isAccent = stat.tone === "accent";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-l border-border pl-4",
        isAccent && "border-l-accent",
        className,
      )}
    >
      <span
        className={cn(
          "font-display text-3xl font-medium leading-none tracking-tight md:text-4xl",
          isAccent ? "text-accent" : "text-text",
        )}
      >
        {stat.value}
      </span>
      <span className="text-small text-muted">{stat.label}</span>
    </div>
  );
}