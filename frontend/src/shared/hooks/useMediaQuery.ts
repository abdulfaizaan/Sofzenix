"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query.
 * @param query - A valid CSS media query string.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const listener = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    list.addEventListener("change", listener);
    return () => list.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
