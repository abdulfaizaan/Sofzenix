import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ServiceIconProps {
  readonly icon: LucideIcon;
  readonly className?: string;
  readonly size?: number;
}

/**
 * Renders a Lucide icon inside a bordered, square badge.
 * Centralizes the look so service cards stay visually aligned.
 */
export function ServiceIcon({ icon: Icon, className, size = 28 }: ServiceIconProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex h-14 w-14 items-center justify-center rounded-md border border-border bg-surface text-text",
        className,
      )}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={1.5} />
    </span>
  );
}