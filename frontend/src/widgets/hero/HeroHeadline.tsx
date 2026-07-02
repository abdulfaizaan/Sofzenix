"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { cn } from "@/shared/utils/cn";
import type { HeroLine } from "./hero.types";

interface HeroHeadlineProps {
  readonly eyebrow?: string;
  readonly lines: readonly HeroLine[];
  readonly className?: string;
}

const emphasisClass: Record<NonNullable<HeroLine["emphasis"]>, string> = {
  normal: "text-text",
  accent: "text-accent",
  outline: "text-transparent [-webkit-text-stroke:1.5px_var(--color-text)]",
};

/**
 * Animated hero headline.
 * Each line reveals via clip-path wipe + per-line child translate stagger.
 * Eyebrow fades in first to set rhythm.
 */
export function HeroHeadline({ eyebrow, lines, className }: HeroHeadlineProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lineEls = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-line]"));
    const innerEls = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-line-inner]"));

    if (reduced) {
      gsap.set(lineEls, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.outExpo } });

      if (eyebrowRef.current) {
        gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
      }

      tl.from(
        lineEls,
        {
          opacity: 0,
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
        },
        0.2,
      ).from(
        innerEls,
        {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
        },
        0.2,
      );
    }, root);

    return () => ctx.revert();
  }, [lines, reduced]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {eyebrow && (
        <span
          ref={eyebrowRef}
          className="mb-8 inline-flex items-center gap-2 font-mono text-small uppercase tracking-[0.3em] text-muted"
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      )}

      <h1 className="font-display text-hero font-medium leading-[0.95] tracking-[-0.04em]">
        {lines.map((line) => (
          <span
            key={line.id}
            data-hero-line
            className="block overflow-hidden"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <span
              data-hero-line-inner
              className={cn(
                "block will-change-transform",
                emphasisClass[line.emphasis ?? "normal"],
              )}
            >
              {line.text}
            </span>
          </span>
        ))}
      </h1>
    </div>
  );
}