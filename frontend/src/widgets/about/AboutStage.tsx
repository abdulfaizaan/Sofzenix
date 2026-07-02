"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { Container } from "@/shared/components/ui/Container";
import { ABOUT_META, ABOUT_PRINCIPLES } from "@/entities/about";
import { AnimatedCounter } from "./AnimatedCounter";
import styles from "./about.module.css";

const MANIFESTO = [
  { id: "m1", text: "Your " },
  { id: "m2", text: "Vision,", accent: true },
  { id: "m3", text: " Our Code." },
];

/**
 * Client orchestrator. Server components consume this entry point.
 */
export function AboutStage(): React.JSX.Element {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = lineRef.current;
    if (!root) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-manifesto-line]"));
    const inners = Array.from(root.querySelectorAll<HTMLElement>("[data-manifesto-inner]"));

    if (reduced) {
      gsap.set(lines, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
        },
        defaults: { ease: EASE.outExpo },
      });

      tl.from(lines, {
        opacity: 0,
        yPercent: 100,
        duration: 0.9,
        stagger: 0.12,
      }).from(
        inners,
        {
          yPercent: 100,
          duration: 0.9,
          stagger: 0.12,
        },
        "<",
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" className={styles.root}>
      <Container>
        <div className={styles.intro}>
          <div>
            <span className={styles.eyebrow}>About SOFZENIX</span>
          </div>
          <div className={styles.introCopy}>
            <p>
              Sofzenix IT Solutions LLP is a modern product studio of engineers and designers building digital
              systems for companies that want to grow. We were founded on September 3, 2025 in Andhra Pradesh. We build modern web, mobile, and marketing solutions for your brand.
            </p>
            <p>
              Our company was built on a foundation of innovation, integrity, and collaboration — driven by an unwavering passion to create exceptional value for our clients and inspire growth.
            </p>
          </div>
        </div>
      </Container>

      <div className={styles.manifesto} ref={lineRef}>
        <Container>
          <p className={styles.manifestoLabel}>Our stance</p>
          <h2
            className={styles.manifestoLine}
            aria-label="Our stance: Your Vision, Our Code."
          >
            {MANIFESTO.map((segment) => (
              <span
                key={segment.id}
                data-manifesto-line
                className="block overflow-hidden"
                style={{ clipPath: "inset(0% 0% 0% 0%)" }}
              >
                <span
                  data-manifesto-inner
                  className={`block will-change-transform ${
                    segment.accent ? styles.manifestoAccent : ""
                  }`}
                >
                  {segment.text}
                </span>
              </span>
            ))}
          </h2>
        </Container>
      </div>

      <Container>
        <div className={styles.principles}>
          {ABOUT_PRINCIPLES.map((principle, i) => (
            <article key={principle.id} className={styles.principle}>
              <span className={styles.principleNumber}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </article>
          ))}
        </div>
      </Container>

      <Container>
        <dl className={styles.meta}>
          {ABOUT_META.map((item) => (
            <div key={item.id} className={styles.metaItem}>
              <dt className={styles.metaLabel}>{item.label}</dt>
              <dd
                className={styles.metaValue}
                data-tone={item.id === "engagements" ? "accent" : undefined}
              >
                {item.prefix}
                {typeof item.numeric === "number" ? (
                  <AnimatedCounter to={item.numeric} />
                ) : (
                  item.value
                )}
                {item.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}