"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Register GSAP plugins exactly once.
 * Idempotent — safe to call from multiple providers.
 */
let registered = false;

export function registerGSAPPlugins(): void {
  if (registered) return;
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Sensible production defaults.
  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });

  registered = true;
}

export { gsap, ScrollTrigger, ScrollToPlugin };
