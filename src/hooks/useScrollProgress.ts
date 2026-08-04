import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onUpdate = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, p)))
    }
    onUpdate()
    ScrollTrigger.addEventListener('refreshInit', onUpdate)
    window.addEventListener('scroll', onUpdate, { passive: true })
    window.addEventListener('resize', onUpdate)
    return () => {
      window.removeEventListener('scroll', onUpdate)
      window.removeEventListener('resize', onUpdate)
      ScrollTrigger.removeEventListener('refreshInit', onUpdate)
    }
  }, [])
  return progress
}