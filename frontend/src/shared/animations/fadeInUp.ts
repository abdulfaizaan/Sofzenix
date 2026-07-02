import { gsap } from "gsap";
import { EASE } from "@/shared/lib/gsap/easings";

interface FadeInUpOptions {
  readonly y?: number;
  readonly duration?: number;
  readonly delay?: number;
  readonly stagger?: number;
}

/**
 * Fade + translateY entrance. Returns a GSAP timeline for chaining.
 */
export function fadeInUp(
  target: gsap.TweenTarget,
  options: FadeInUpOptions = {},
): gsap.core.Timeline {
  const { y = 32, duration = 0.8, delay = 0, stagger = 0 } = options;

  return gsap.timeline().from(target, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: EASE.outExpo,
  });
}
