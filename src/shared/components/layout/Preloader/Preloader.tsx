"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import styles from "./Preloader.module.css";

/* Minimum theatrical hold — long enough that the counter feels deliberate. */
const MIN_DURATION_MS = 2500;
const TICK_MS = 16;

/**
 * Phases displayed in the bottom-left, rotated by progress percentage.
 * Each one rolls up at its threshold with a small fade.
 */
const PHASES: ReadonlyArray<{ at: number; label: string }> = [
  { at: 0, label: "Initializing" },
  { at: 18, label: "Loading assets" },
  { at: 42, label: "Composing layout" },
  { at: 68, label: "Tuning motion" },
  { at: 92, label: "Ready" },
];

/**
 * Fantasy-style preloader.
 *
 * Composition:
 *  - Top bar: brand mark (left) + status tag (right)
 *  - Center: oversized 0→100 counter + thin 1px progress bar
 *  - Bottom bar: rotating phase copy (left) + elapsed time (right)
 *
 * Exit: full preloader translates -100% on Y (slide-up curtain), then is
 * removed from the DOM. Honors prefers-reduced-motion (snap exit).
 */
export function Preloader(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef<HTMLSpanElement | null>(null);
  const elapsedRef = useRef<HTMLSpanElement | null>(null);
  const [state, setState] = useState<"loading" | "loaded" | "exit">("loading");
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    const fill = fillRef.current;
    const phase = phaseRef.current;
    const elapsed = elapsedRef.current;
    if (!root || !counter || !fill || !phase || !elapsed) return;

    const start = performance.now();
    let lastPhaseIndex = -1;
    let timeoutId = 0;

    const formatElapsed = (ms: number): string => {
      const seconds = (ms / 1000).toFixed(2);
      return `${seconds}s`;
    };

    const setPhase = (index: number): void => {
      if (index === lastPhaseIndex) return;
      lastPhaseIndex = index;
      const entry = PHASES[index];
      if (!entry) return;

      // Quick cross-fade so the phase label never overlaps itself.
      phase.style.opacity = "0";
      window.setTimeout(() => {
        phase.textContent = entry.label;
        phase.style.opacity = "1";
      }, 120);
    };

    const setProgress = (value: number): void => {
      const pct = Math.max(0, Math.min(100, value));
      counter.textContent = String(Math.round(pct));
      fill.style.setProperty("--progress", String(pct / 100));

      // Pick the highest phase whose `at <= pct`.
      let nextPhase = 0;
      for (let i = 0; i < PHASES.length; i += 1) {
        const entry = PHASES[i];
        if (entry && pct >= entry.at) nextPhase = i;
      }
      setPhase(nextPhase);
    };

    const finish = (): void => {
      setProgress(100);
      setState("loaded");

      const tl = gsap.timeline({
        defaults: { ease: EASE.outExpo },
        onComplete: () => {
          setState("exit");
          root.style.display = "none";
        },
      });

      if (reduced) {
        tl.set(root, { yPercent: -100, duration: 0 });
        return;
      }

      // Slide-up curtain exit.
      tl.to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
    };

    const tick = (now: number): void => {
      const elapsedMs = now - start;
      elapsed.textContent = formatElapsed(elapsedMs);

      const ratio = Math.min(elapsedMs / MIN_DURATION_MS, 1);
      // Ease-out so the counter lands smoothly.
      const eased = 1 - Math.pow(1 - ratio, 1.6);
      setProgress(eased * 100);

      if (ratio < 1) {
        timeoutId = window.setTimeout(
          () => requestAnimationFrame(tick),
          TICK_MS,
        ) as unknown as number;
      } else {
        finish();
      }
    };

    // First phase renders immediately, no fade-in.
    const firstPhase = PHASES[0];
    if (firstPhase) phase.textContent = firstPhase.label;

    timeoutId = window.setTimeout(
      () => requestAnimationFrame(tick),
      TICK_MS,
    ) as unknown as number;

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-state={state}
      aria-hidden={state === "exit"}
      role="status"
      aria-live="polite"
      aria-label="Loading SOFZENIX"
    >
      <header className={styles.top}>
        <span className={styles.mark}>
          <span className={styles.markDot} aria-hidden="true" />
          SOFZENIX · STUDIO
        </span>
        <span className={styles.status}>Loading</span>
      </header>

      <div className={styles.stage}>
        <span className={styles.counter} aria-label="Loading progress">
          <span ref={counterRef}>0</span>
          <span className={styles.counterSymbol} aria-hidden="true">
            %
          </span>
        </span>

        <div className={styles.bar} aria-hidden="true">
          <div ref={fillRef} className={styles.barFill} />
        </div>
      </div>

      <footer className={styles.bottom}>
        <span className={styles.phase}>
          <span className={styles.phaseDot} aria-hidden="true" />
          <span ref={phaseRef} className={styles.phaseText}>
            Initializing
          </span>
        </span>
        <span className={styles.elapsed}>
          <span ref={elapsedRef}>0.00s</span>
        </span>
      </footer>
    </div>
  );
}