"use client";

import { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { cn } from "@/shared/utils/cn";

interface MagneticProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly strength?: number;
  readonly range?: number;
}

/**
 * Translates children toward the cursor while hovering within `range`.
 * Pure transform animation — no layout thrash.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  range = 120,
}: MagneticProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: EASE.outExpo });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: EASE.outExpo });

    const onMove = (event: globalThis.MouseEvent): void => {
      const { clientX, clientY } = event;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < range) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = (): void => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, range, reduced]);

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}