import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../../data/team'
import SectionHeading from '../../components/ui/SectionHeading'
import { gsap, initGSAP } from '../../lib/gsap'
import { useReveal } from '../../hooks/useReveal'
import styles from './Testimonials.module.css'

initGSAP()

export default function Testimonials() {
  const [i, setI] = useState(0)
  const ref = useReveal({ selector: 'h2, p, .q', y: 30, stagger: 0.1 })
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const t = testimonials[i]
    gsap.fromTo(el.querySelectorAll('.q, .name, .role'), {
      opacity: 0,
      y: 12,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power3.out',
    })
  }, [i])

  const t = testimonials[i]

  return (
    <section className={styles.wrap} ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title="What our clients say." />
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.dial} ref={textRef}>
              <svg className={styles.quote} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M9 7H4v8h5l-1 4-2-2v-4H4V5h7l-2 2zm11 0h-5v8h5l-1 4-2-2v-4h-2V5h7l-2 2z"/>
              </svg>
              <p className="q h-1">{t.quote}</p>
              <div className={styles.meta}>
                <div>
                  <div className={`name ${styles.name}`}>{t.name}</div>
                  <div className={`role ${styles.role}`}>{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.controls}>
              <button onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span className={styles.count}>{String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
              <button onClick={() => setI((p) => (p + 1) % testimonials.length)} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <div className={styles.dots}>
              {testimonials.map((_, j) => (
                <button
                  key={j}
                  className={`${styles.dot} ${j === i ? styles.dotActive : ''}`}
                  onClick={() => setI(j)}
                  aria-label={`Show testimonial ${j + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}