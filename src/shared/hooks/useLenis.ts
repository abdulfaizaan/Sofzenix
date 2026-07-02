"use client";

import Lenis from "lenis";

/**
 * Singleton holder for the Lenis instance created by SmoothScrollProvider.
 * Provides scroll velocity to consumers without recreating the instance.
 */
let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis(): Lenis | null {
  return lenisInstance;
}
