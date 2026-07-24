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

  // Respect user preference for reduced motion
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: reduce)", () => {
    // This instantly resolves or disables animations globally if a user prefers reduced motion
    gsap.globalTimeline.timeScale(1000);
    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" });
    // Cleanup/revert function (optional)
    return () => {
      gsap.globalTimeline.timeScale(1);
    };
  });

  // Sensible production defaults.
  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });

  registered = true;
}

export { gsap, ScrollTrigger, ScrollToPlugin };
