import { gsap } from "gsap";
import { EASE } from "./easings";

interface TimelineOptions {
  readonly y?: number;
  readonly duration?: number;
  readonly stagger?: number;
  readonly delay?: number;
}

/**
 * Build a reusable fade-in-up entrance timeline.
 */
export function buildFadeInUpTimeline(
  target: gsap.TweenTarget,
  options: TimelineOptions = {},
): gsap.core.Timeline {
  const { y = 32, duration = 0.8, stagger = 0, delay = 0 } = options;

  return gsap.timeline().from(target, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: EASE.outExpo,
  });
}
