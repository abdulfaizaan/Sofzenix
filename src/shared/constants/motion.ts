/**
 * Motion design tokens.
 * Durations, easings, staggers used across animations.
 */
export const MOTION = {
  duration: {
    fast: 0.2,
    normal: 0.5,
    hero: 1.0,
  },
  ease: {
    outExpo: "power3.out",
    inOutExpo: "power3.inOut",
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    loose: 0.16,
  },
} as const;

export type MotionConfig = typeof MOTION;