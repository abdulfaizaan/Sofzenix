"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";

interface AnimatedCounterProps {
  readonly to: number;
  readonly duration?: number;
  readonly className?: string;
}

/**
 * Scroll-triggered numeric counter.
 * Counts from 0 to `to` once when the element enters the viewport.
 * Degrades to the final value under reduced motion.
 */
export function AnimatedCounter({
  to,
  duration = 1.6,
  className,
}: AnimatedCounterProps): JSX.Element {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const proxy = { v: 0 };
    el.textContent = "0";

    if (reduced) {
      el.textContent = String(to);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        v: to,
        duration,
        ease: EASE.outExpo,
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.v));
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, duration, reduced]);

  return <span ref={ref} className={className} />;
}