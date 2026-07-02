"use client";

import { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { cn } from "@/shared/utils/cn";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
  readonly duration?: number;
  readonly as?: "div" | "span" | "section" | "article" | "li";
  readonly once?: boolean;
}

/**
 * Wraps children in a clip-path + y reveal driven by ScrollTrigger.
 * Server-rendered children remain untouched; only the wrapper mounts animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.8,
  as: Tag = "div",
  once = true,
}: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        clipPath: "inset(100% 0% 0% 0%)",
        duration,
        delay,
        ease: EASE.outExpo,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, reduced, once]);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  );
}