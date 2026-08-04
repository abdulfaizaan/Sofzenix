import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useReveal } from '../../hooks/useReveal'

const cols = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/services', label: 'Services' },
      { to: '/portfolio', label: 'Portfolio' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: 'https://www.linkedin.com/company/sofzenix-it-solutions/', label: 'LinkedIn' },
      { href: 'https://github.com/softechitsolution', label: 'GitHub' },
      { href: 'mailto:contact@sofzenix.in', label: 'contact@sofzenix.in' },
      { href: 'https://x.com/SoftechITSol', label: 'Twitter / X' },
    ],
  },
]

export default function Footer() {
  const ref = useReveal({ selector: 'a, p, h2', stagger: 0.04, y: 20, start: 'top 95%' })
  return (
    <footer className={styles.footer} ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={styles.top}>
          <h2 className="h-display">
            Got a project in <span className="gradient-text">mind?</span>
          </h2>
          <Link to="/contact" className={styles.bigCta}>
            <span>Let's talk</span>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden>
                <defs>
                  <linearGradient id="ftlogo" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7c5cff" />
                    <stop offset="100%" stopColor="#ff6bd8" />
                  </linearGradient>
                </defs>
                <path d="M16 18 L32 50 L48 18 L40 18 L32 34 L24 18 Z" fill="url(#ftlogo)" />
              </svg>
              <span className={styles.brandText}>SOFZENIX</span>
            </div>
            <p className={styles.tagline}>
              We Build Cloud-Native Software Solutions. Powering enterprises with precision-engineered, secure, and scalable digital products.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mono">{col.title}</h4>
              <ul className={styles.list}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {'to' in l ? (
                      <Link to={l.to!}>{l.label}</Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mono">Locations</h4>
            <ul className={styles.list}>
              <li>Narasaraopeta, AP</li>
              <li>Remote — everywhere</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Sofzenix IT Solutions LLP. All rights reserved.</span>
          <span className="mono">v1.0 — Built with craft</span>
        </div>
      </div>

      <div className={styles.giant} aria-hidden>SOFZENIX</div>
    </footer>
  )
}