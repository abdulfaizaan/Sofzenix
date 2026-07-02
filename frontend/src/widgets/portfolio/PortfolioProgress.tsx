"use client";

import { useEffect, useRef, useState } from "react";

interface PortfolioProgressProps {
  readonly current: number;
  readonly total: number;
}

/**
 * Mirrors scroll progress to a CSS scale on the indicator bar.
 * Avoids registering a second ScrollTrigger purely for visual progress.
 */
export function PortfolioProgress({ current, total }: PortfolioProgressProps): React.JSX.Element {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const onScroll = (): void => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? window.scrollY / docHeight : 0;
      setProgress(Math.min(Math.max(ratio, 0), 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span aria-hidden="true">{String(current).padStart(2, "0")}</span>
      <div className="relative h-px w-60 overflow-hidden bg-border">
        <div
          ref={fillRef}
          className="absolute inset-0 origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <span aria-hidden="true">{String(total).padStart(2, "0")}</span>
    </div>
  );
}