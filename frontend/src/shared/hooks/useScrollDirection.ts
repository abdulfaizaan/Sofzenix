"use client";

import { useEffect, useState } from "react";

/**
 * Tracks scroll direction for hide-on-scroll-down UI patterns.
 * Returns "up" or "down" plus a boolean `atTop` flag.
 */
export function useScrollDirection(): { direction: "up" | "down"; atTop: boolean } {
  const [state, setState] = useState<{ direction: "up" | "down"; atTop: boolean }>({
    direction: "up",
    atTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let rafId = 0;

    const update = (): void => {
      const y = window.scrollY;
      setState({
        direction: y > lastY ? "down" : "up",
        atTop: y < 8,
      });
      lastY = y;
    };

    const onScroll = (): void => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return state;
}
