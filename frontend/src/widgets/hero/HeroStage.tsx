"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { Container } from "@/shared/components/ui/Container";
import { STATS } from "@/entities/stat";
import { FloatingStat } from "@/entities/stat/FloatingStat";
import { HeroBackground } from "./HeroBackground";
import { HeroHeadline } from "./HeroHeadline";
import { HeroActions } from "./HeroActions";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import type { HeroProps } from "./hero.types";

/**
 * Hero stage — orchestrates background, headline, stats, and CTA.
 * RSC children (HeroActions) remain server-rendered.
 */
export function HeroStage({
  eyebrow = "SOFZENIX · STUDIO",
  lines,
  description,
  primaryCta,
  secondaryCta,
  showStats = true,
  showScrollIndicator = true,
}: HeroProps): React.JSX.Element {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    if (reduced) {
      gsap.set(stats, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(stats, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 1.0,
        ease: "power3.out",
      });
    }, stats);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 md:pt-32">
      <HeroBackground />

      <Container className="relative z-[1]">
        <HeroHeadline eyebrow={eyebrow} lines={lines} />

        <HeroActions
          description={description}
          primary={primaryCta}
          secondary={secondaryCta}
        />

        {showStats && (
          <div
            ref={statsRef}
            className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:mt-32 md:grid-cols-4"
          >
            {STATS.map((stat, i) => (
              <FloatingStat key={stat.id} stat={stat} index={i} />
            ))}
          </div>
        )}
      </Container>

      {showScrollIndicator && <HeroScrollIndicator />}
    </section>
  );
}