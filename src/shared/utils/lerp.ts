/**
 * Linear interpolation between two numbers.
 * Used for smooth cursor and scroll-linked animations.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}