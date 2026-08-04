import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Reveal a set of children (or the ref itself) when scrolled into view.
 * Pass an array of refs to stagger between them.
 */
export function useReveal(
  options: {
    selector?: string
    y?: number
    x?: number
    stagger?: number
    start?: string
    duration?: number
    delay?: number
    once?: boolean
  } = {}
) {
  const ref = useRef<HTMLElement | null>(null)
  const {
    selector = ':scope > *',
    y = 40,
    stagger = 0.08,
    start = 'top 80%',
    duration = 1,
    delay = 0,
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(el.querySelectorAll(selector), { opacity: 1, y: 0, x: 0 })
      return
    }

    const targets = el.querySelectorAll(selector)
    gsap.set(targets, { opacity: 0, y, x: 0 })

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [selector, y, stagger, start, duration, delay, once])

  return ref
}