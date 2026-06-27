"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import styles from "./Cursor.module.css";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="hover"], input, textarea, select, label[for]';

/**
 * Premium magnetic cursor.
 * - Hidden on touch devices via CSS.
 * - Honors prefers-reduced-motion (instant follow, no lag).
 * - Scales on interactive elements via attribute selectors.
 */
export function Cursor(): JSX.Element | null {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const isTouch = useMediaQuery("(hover: none), (pointer: coarse)");

  useEffect(() => {
    if (isTouch) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xToDot = gsap.quickTo(dot, "x", { duration: reduced ? 0 : 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: reduced ? 0 : 0.1, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: reduced ? 0 : 0.45, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: reduced ? 0 : 0.45, ease: "power3.out" });

    const setHover = (on: boolean): void => {
      dot.dataset.hover = String(on);
      ring.dataset.hover = String(on);
    };

    const onMove = (event: MouseEvent): void => {
      xToDot(event.clientX);
      yToDot(event.clientY);
      xToRing(event.clientX);
      yToRing(event.clientY);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(INTERACTIVE_SELECTOR);
      setHover(Boolean(interactive));
    };

    const onLeave = (): void => setHover(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
    </>
  );
}