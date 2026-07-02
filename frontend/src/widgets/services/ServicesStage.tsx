"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { Container } from "@/shared/components/ui/Container";
import { Heading } from "@/shared/components/ui/Heading";
import { Button } from "@/shared/components/ui/Button";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import { SERVICES } from "@/entities/service";
import { ServiceRow } from "./ServiceRow";
import styles from "./services.module.css";

/**
 * Client-side orchestrator.
 * - Sticky intro column animates subtle parallax on scroll.
 * - Each row is wrapped in `Reveal` (inside ServiceRow) and animates as it enters.
 */
export function ServicesStage(): React.JSX.Element {
  const introRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const intro = introRef.current;
    if (!intro || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        intro,
        { y: 0 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: intro,
            start: "top top+=120",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, intro);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="services" className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <div ref={introRef} className={styles.intro}>
            <span className={styles.eyebrow}>What we do</span>

            <Heading level="h2" as="h2">
              Capabilities built for products that ship.
            </Heading>

            <p className="max-w-md text-body text-muted">
              Four disciplines, one team. We compress the distance between strategy
              and shipped software — no agency handoffs, no lost context.
            </p>

            <div className="mt-4">
              <Magnetic>
                <Button href="/services" variant="outline" size="md">
                  All capabilities
                  <span aria-hidden="true">→</span>
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className={styles.list}>
            {SERVICES.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}