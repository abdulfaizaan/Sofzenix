import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, initGSAP } from '../../lib/gsap'

initGSAP()

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo(0, 0)

    if (reduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0, skewY: 0, filter: 'blur(0px)' })
      return
    }

    // Default transition
    let fromVars: gsap.TweenVars = { opacity: 0, y: 32, filter: 'blur(8px)' }
    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotationX: 0,
      skewY: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power4.out',
      clearProps: 'all',
    }

    const path = location.pathname

    if (path === '/') {
      // Home: dynamic expansion
      fromVars = { opacity: 0, scale: 0.95, filter: 'blur(10px)' }
    } else if (path === '/about') {
      // About: storytelling slide from left
      fromVars = { opacity: 0, x: -60, filter: 'blur(8px)' }
    } else if (path === '/services') {
      // Services: structural slide up with skew
      fromVars = { opacity: 0, y: 60, skewY: 4, filter: 'blur(8px)' }
    } else if (path === '/portfolio') {
      // Portfolio: creative 3D reveal
      fromVars = { opacity: 0, rotationX: 15, y: 40, transformPerspective: 1000, filter: 'blur(10px)' }
    } else if (path.startsWith('/blog')) {
      // Blog: dropping in like news
      fromVars = { opacity: 0, y: -40, filter: 'blur(8px)' }
    } else if (path === '/careers') {
      // Careers: moving forward slide from right
      fromVars = { opacity: 0, x: 60, filter: 'blur(8px)' }
    } else if (path === '/contact') {
      // Contact: focused zoom-out
      fromVars = { opacity: 0, scale: 1.05, filter: 'blur(8px)' }
    }

    // Reset properties before animating to avoid conflicts from previous transitions
    gsap.set(el, { x: 0, y: 0, scale: 1, rotationX: 0, skewY: 0 })

    gsap.fromTo(el, fromVars, toVars)
  }, [location.pathname])

  return (
    <div ref={wrapRef} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}