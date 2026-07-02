import { gsap } from "gsap";
import { EASE } from "@/shared/lib/gsap/easings";

interface StaggerOptions {
  readonly childSelector?: string;
  readonly y?: number;
  readonly duration?: number;
  readonly stagger?: number;
}

/**
 * Reveal each child of `target` in sequence.
 */
export function staggerIn(
  target: gsap.TweenTarget,
  options: StaggerOptions = {},
): gsap.core.Timeline {
  const { childSelector = ":scope > *", y = 24, duration = 0.6, stagger = 0.08 } = options;

  return gsap.timeline().from(`${target} ${childSelector}`, {
    opacity: 0,
    y,
    duration,
    stagger,
    ease: EASE.outExpo,
  });
}