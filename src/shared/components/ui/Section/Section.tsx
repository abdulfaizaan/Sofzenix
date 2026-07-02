import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface SectionProps {
  readonly as?: ElementType;
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly spacing?: "default" | "tight" | "loose" | "none";
  readonly tone?: "default" | "surface" | "bordered";
}

/**
 * Vertical-rhythm section wrapper. Encodes the spacing scale.
 * - default:  y-padding 96px / 128px desktop
 * - tight:    y-padding 64px
 * - loose:    y-padding 160px
 * - none:     no padding
 */
export function Section({
  as: Tag = "section",
  children,
  className,
  id,
  spacing = "default",
  tone = "default",
}: SectionProps): JSX.Element {
  const spacingClass = {
    default: "py-24 md:py-32",
    tight: "py-16 md:py-24",
    loose: "py-32 md:py-40",
    none: "",
  }[spacing];

  const toneClass = {
    default: "bg-bg",
    surface: "bg-surface",
    bordered: "bg-bg border-y border-border",
  }[tone];

  return (
    <Tag id={id} className={cn("relative w-full", spacingClass, toneClass, className)}>
      {children}
    </Tag>
  );
}