"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { StatCard } from "./StatCard";
import type { Stat } from "./stat.data";
import { cn } from "@/shared/utils/cn";

interface FloatingStatProps {
  readonly stat: Stat;
  readonly className?: string;
  readonly index?: number;
}

/**
 * Stat card with a delayed entrance + subtle scroll-linked float.
 * - Entrance: opacity + y, staggered by `index`.
 * - Float: y-translate linked to scroll velocity via ScrollTrigger.
 */
export function FloatingStat({ stat, className, index = 0 }: FloatingStatProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        delay: 0.4 + index * 0.1,
        ease: EASE.outExpo,
      });

      gsap.to(el, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [index, reduced]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <StatCard stat={stat} />
    </div>
  );
}