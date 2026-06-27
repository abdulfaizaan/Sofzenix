"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import styles from "./route-progress.module.css";

/**
 * Top-bar navigation progress indicator.
 * Hooks into App Router navigation events and animates a scaleX tween.
 * Respects reduced motion by snapping to final values.
 */
export function RouteProgress(): JSX.Element {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const tl = gsap.timeline({ defaults: { ease: EASE.outExpo } });

    if (reduced) {
      tl.set(fill, { scaleX: 1 })
        .to(fill, { scaleX: 0, duration: 0.3, delay: 0.1 })
        .set(fill, { scaleX: 0 });
      return () => {
        tl.kill();
      };
    }

    tl.set(fill, { scaleX: 0.05 })
      .to(fill, { scaleX: 0.7, duration: 0.6 })
      .to(fill, { scaleX: 1, duration: 0.3 })
      .to(fill, { scaleX: 0, duration: 0.4, transformOrigin: "right center" }, "+=0.1");

    return () => {
      tl.kill();
    };
  }, [pathname, searchParams, reduced]);

  return (
    <div className={styles.root} role="progressbar" aria-label="Page loading">
      <div ref={fillRef} className={styles.fill} />
      <div className={styles.glow} aria-hidden="true" />
    </div>
  );
}