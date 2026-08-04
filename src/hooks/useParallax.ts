import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const tween = gsap.fromTo(
      el,
      { y: () => -100 * speed },
      {
        y: () => 100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [speed])
  return ref
}