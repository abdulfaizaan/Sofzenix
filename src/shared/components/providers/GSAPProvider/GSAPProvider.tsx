"use client";

import { useEffect, type ReactNode } from "react";
import { registerGSAPPlugins } from "@/shared/lib/gsap/registerPlugins";

interface GSAPProviderProps {
  readonly children: ReactNode;
}

/**
 * Registers GSAP plugins on mount.
 * Should be rendered inside SmoothScrollProvider so ScrollTrigger.update
 * driven by Lenis works after registration.
 */
export function GSAPProvider({ children }: GSAPProviderProps): ReactNode {
  useEffect(() => {
    registerGSAPPlugins();
  }, []);

  return <>{children}</>;
}