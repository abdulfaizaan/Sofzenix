import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Infinite horizontal marquee.
 * Children are duplicated so the loop is seamless.
 */
export function useMarquee(opts: { speed?: number; direction?: 'left' | 'right' } = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { speed = 60, direction = 'left' } = opts

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const track = root.querySelector<HTMLElement>('[data-marquee-track]')
    if (!track) return

    // Duplicate children
    const original = Array.from(track.children)
    original.forEach((c) => track.appendChild(c.cloneNode(true)))

    const totalWidth = track.scrollWidth / 2
    const tween = gsap.to(track, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => {
          const n = parseFloat(x)
          return direction === 'left'
            ? ((n % totalWidth) + totalWidth) % totalWidth - totalWidth
            : ((n % totalWidth) - totalWidth + totalWidth) % totalWidth
        }),
      },
    })

    return () => { tween.kill() }
  }, [speed, direction])

  return ref
}