import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface ContainerProps {
  readonly as?: ElementType;
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly size?: "default" | "narrow" | "wide" | "full";
}

/**
 * Centered max-width wrapper.
 * - default:   1280px content width
 * - narrow:    880px (for prose / forms)
 * - wide:      1440px (hero / portfolio)
 * - full:      100% with gutter only
 */
export function Container({
  as: Tag = "div",
  children,
  className,
  id,
  size = "default",
}: ContainerProps): JSX.Element {
  const sizeClass = {
    default: "max-w-[1280px]",
    narrow: "max-w-[880px]",
    wide: "max-w-[1440px]",
    full: "max-w-none",
  }[size];

  return (
    <Tag id={id} className={cn("mx-auto w-full px-[var(--gutter)]", sizeClass, className)}>
      {children}
    </Tag>
  );
}