"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/shared/lib/gsap/registerPlugins";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { setLenisInstance } from "@/shared/hooks/useLenis";

interface SmoothScrollProviderProps {
  readonly children: ReactNode;
}

/**
 * Global smooth-scroll provider.
 * Mounts a single Lenis instance, syncs it to GSAP ScrollTrigger,
 * and disposes cleanly on unmount. Honors prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps): ReactNode {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.remove("lenis");
      setLenisInstance(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [reduced]);

  return <>{children}</>;
}