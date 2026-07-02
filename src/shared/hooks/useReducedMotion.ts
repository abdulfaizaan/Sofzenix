"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user prefers reduced motion.
 * SSR-safe: defaults to false until hydration completes.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const handler = (event: MediaQueryListEvent): void => {
      setReduced(event.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reduced;
}
