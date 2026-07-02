"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";

/**
 * Layered hero background.
 * - Radial gradient (CSS, free).
 * - SVG noise overlay for film grain (decorative).
 * - Mouse-following spotlight (decorative, transform-only).
 * - Slow parallax scale linked to scroll (decorative).
 *
 * All animations respect reduced motion.
 */
export function HeroBackground(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const spotlight = spotlightRef.current;
    if (!root || !spotlight) return;

    if (reduced) return;

    const xTo = gsap.quickTo(spotlight, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(spotlight, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (event: MouseEvent): void => {
      const { innerWidth, innerHeight } = window;
      xTo(event.clientX - innerWidth / 2);
      yTo(event.clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", onMove);

    const ctx = gsap.context(() => {
      gsap.to(root, {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklab, var(--color-accent) 18%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 100%, color-mix(in oklab, var(--color-accent-secondary) 14%, transparent) 0%, transparent 60%), var(--color-bg)",
        }}
      />

      {/* Spotlight that follows the cursor */}
      <div
        ref={spotlightRef}
        className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 25%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      {/* SVG film grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="heroNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroNoise)" />
      </svg>
    </div>
  );
}