"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { Container } from "@/shared/components/ui/Container";
import { Heading } from "@/shared/components/ui/Heading";
import { Button } from "@/shared/components/ui/Button";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import { PROJECTS as STATIC_PROJECTS, Project, ProjectCard } from "@/entities/project";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { PortfolioProgress } from "./PortfolioProgress";
import styles from "./portfolio.module.css";

/**
 * Pinned horizontal-scroll portfolio.
 * On mobile, ScrollTrigger is skipped and the cards stack vertically.
 */
export function PortfolioStage({ projects }: { projects?: Project[] }): React.JSX.Element {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const displayProjects = projects && projects.length > 0 ? projects : STATIC_PROJECTS;

  useIsomorphicLayoutEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track || isMobile) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));

    const getDistance = (): number => {
      const stageWidth = stage.offsetWidth;
      const trackWidth = track.scrollWidth;
      return Math.max(0, trackWidth - stageWidth);
    };

    if (reduced) {
      track.style.transform = "translate3d(0,0,0)";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            cards.forEach((card) => {
              const rect = card.getBoundingClientRect();
              const stageRect = stage.getBoundingClientRect();
              const cardCenter = rect.left + rect.width / 2 - stageRect.left;
              const stageCenter = stageRect.width / 2;
              const distance = Math.abs(cardCenter - stageCenter);
              const norm = Math.min(distance / stageRect.width, 1);
              gsap.set(card, {
                scale: 1 - norm * 0.04,
                opacity: 1 - norm * 0.35,
              });
            });
          },
        },
      });

      // Entrance for the intro copy.
      gsap.from("[data-portfolio-intro]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.outExpo,
        scrollTrigger: {
          trigger: "[data-portfolio-intro]",
          start: "top 85%",
        },
      });
    }, stage);

    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <section id="work" className={styles.root}>
      <div className={styles.intro} data-portfolio-intro>
        <Container>
          <span className={styles.eyebrow}>Selected work</span>
          <Heading level="h2" as="h2" className="mt-6 max-w-3xl">
            Products that earn their place in the world.
          </Heading>
          <p className="mt-6 max-w-2xl text-body text-muted">
            A small catalog of recent collaborations across fintech, climate, health,
            and logistics. Each project ships with measurable outcomes.
          </p>

          <div className="mt-10">
            <Magnetic>
              <Button href="/work" variant="outline" size="md">
                View all case studies
                <span aria-hidden="true">→</span>
              </Button>
            </Magnetic>
          </div>
        </Container>
      </div>

      <div ref={stageRef} className={styles.stage}>
        <div ref={trackRef} className={styles.track}>
          {displayProjects.map((project) => (
            <div key={project.id} className={styles.card}>
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>

        <div className={styles.progress}>
          <PortfolioProgress current={1} total={displayProjects.length} />
        </div>
      </div>
    </section>
  );
}