import { useEffect, useRef } from 'react'
import { gsap, initGSAP } from '../../lib/gsap'
import { useMagnetic } from '../../hooks/useMagnetic'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

initGSAP()

export default function Hero() {
  const root = useRef<HTMLElement | null>(null)
  const ctaRef = useMagnetic(0.3)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(el.querySelectorAll('[data-h]'), { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo('[data-h-line]', { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1 })
      .fromTo('[data-h]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
      .fromTo('[data-h-orb]', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' }, 0)

    return () => { tl.kill() }
  }, [])

  return (
    <section className={styles.hero} ref={root}>
      <div className={styles.bg} aria-hidden>
        <div className={styles.orb} data-h-orb />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.eyebrow} data-h>
          <span className={styles.dot} /> Available for new work — Q3 2026
        </div>

        <h1 className={styles.title}>
          <span className={styles.lineMask}>
            <span data-h-line className={styles.line}>We build</span>
          </span>
          <span className={styles.lineMask}>
            <span data-h-line className={styles.line}>
              <span className="gradient-text">cloud-native</span> software
            </span>
          </span>
          <span className={styles.lineMask}>
            <span data-h-line className={styles.line}>solutions.</span>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lede} data-h>
            From custom web apps and mobile platforms to AI integrations and cloud infrastructure — Sofzenix powers enterprises with precision-engineered, secure, and scalable digital products.
          </p>
          <div className={styles.actions} data-h>
            <Link to="/services" className={styles.primary} ref={ctaRef as React.RefObject<HTMLAnchorElement>}>
              <span>Explore Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
            <Link to="/contact" className={styles.secondary}>
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} data-h aria-hidden>
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}