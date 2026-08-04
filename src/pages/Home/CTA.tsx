import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
import { useMagnetic } from '../../hooks/useMagnetic'
import styles from './CTA.module.css'

export default function CTA() {
  const ref = useReveal({ selector: 'h2, p, a', y: 30, stagger: 0.1 })
  const ctaRef = useMagnetic(0.3)
  return (
    <section className={styles.wrap} ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.glow} aria-hidden />
          <span className="mono">Let's build</span>
          <h2 className="h-display">
            Have an idea worth making <span className="gradient-text">real?</span>
          </h2>
          <p>We reply to every project brief within 24 hours. No pitch decks, no agency tax — just a conversation.</p>
          <Link to="/contact" className={styles.cta} ref={ctaRef as React.RefObject<HTMLAnchorElement>}>
            <span>Start a project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}