"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";

/**
 * Bouncing "scroll" indicator at the bottom of the hero.
 * Pure transform — no layout cost.
 */
export function HeroScrollIndicator(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        delay: 1.4,
      });

      gsap.to(el.querySelector("[data-scroll-dot]"), {
        y: 12,
        duration: 1.1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
    >
      <div className="flex flex-col items-center gap-3 text-small font-mono uppercase tracking-[0.3em] text-muted">
        <span>Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-border">
          <span
            data-scroll-dot
            className="absolute left-0 top-0 h-3 w-px bg-accent will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}