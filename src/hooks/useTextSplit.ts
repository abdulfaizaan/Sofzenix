import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap'

/**
 * Split text on enter. Words fade-up in stagger.
 */
export function useTextSplit(opts: { start?: string; stagger?: number; type?: 'words' | 'chars' } = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const { start = 'top 85%', stagger = 0.04, type = 'words' } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const split = new SplitText(el, { type: `words,${type}` })
    const targets = type === 'words' ? split.words : split.chars

    gsap.set(targets, { yPercent: 110, opacity: 0 })

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
    }
  }, [start, stagger, type])

  return ref
}