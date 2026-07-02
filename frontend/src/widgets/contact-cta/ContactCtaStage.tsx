"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import { SITE } from "@/shared/constants/site";
import styles from "./contact-cta.module.css";

interface ReassuranceItem {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface ContactCtaStageProps {
  readonly eyebrow?: string;
  readonly headline: readonly string[];
  readonly accentIndex?: number;
  readonly subline?: string;
  readonly primaryCtaLabel: string;
  readonly primaryCtaHref: string;
  readonly secondaryCtaLabel?: string;
  readonly secondaryCtaHref?: string;
  readonly reassurance?: readonly ReassuranceItem[];
}

const DEFAULT_REASSURANCE: readonly ReassuranceItem[] = [
  { id: "reply", label: "Reply within", value: "24 hours, weekdays" },
  { id: "nda", label: "NDA", value: "On request, before the first call" },
  { id: "obligation", label: "Obligation", value: "None. Discovery is free." },
];

/**
 * Client orchestrator. Single staggered entrance timeline + ScrollTrigger.
 * Renders content as supplied via props to keep the widget reusable
 * for /contact and any future landing variants.
 */
export function ContactCtaStage({
  eyebrow = "Let's build",
  headline,
  accentIndex = 0,
  subline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  reassurance = DEFAULT_REASSURANCE,
}: ContactCtaStageProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-cta-stagger]"));

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="contact" className={styles.root}>
      <div className={styles.glow} aria-hidden="true" />
      <Container>
        <div ref={rootRef} className={styles.inner}>
          <span data-cta-stagger className={styles.eyebrow}>
            {eyebrow}
          </span>

          <h2 data-cta-stagger className={styles.headline}>
            {headline.map((segment, i) => (
              <span
                key={`${segment}-${i}`}
                className={i === accentIndex ? styles.headlineAccent : undefined}
              >
                {segment}
                {i < headline.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>

          {subline && (
            <p data-cta-stagger className={styles.subline}>
              {subline}
            </p>
          )}

          <div data-cta-stagger className={styles.actions}>
            <Magnetic>
              <Button href={primaryCtaHref} size="lg" variant="primary">
                {primaryCtaLabel}
                <span aria-hidden="true">→</span>
              </Button>
            </Magnetic>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Magnetic>
                <Button href={secondaryCtaHref} size="lg" variant="outline">
                  {secondaryCtaLabel}
                </Button>
              </Magnetic>
            )}
          </div>

          <ul data-cta-stagger className={styles.reassurance} aria-label="What to expect">
            {reassurance.map((item) => (
              <li key={item.id} className={styles.reassuranceItem}>
                <span className={styles.reassuranceLabel}>{item.label}</span>
                <span className={styles.reassuranceValue}>{item.value}</span>
              </li>
            ))}
          </ul>

          <div data-cta-stagger className={styles.contactRow}>
            <span>Or write to us directly:</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}