import { useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { gsap, initGSAP } from '../../lib/gsap'
import styles from './MenuOverlay.module.css'

initGSAP()

type Props = {
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/', label: 'Home', italic: 'where wonder begins' },
  { to: '/about', label: 'About', italic: 'who we are' },
  { to: '/services', label: 'Services', italic: 'what we do' },
  { to: '/portfolio', label: 'Work', italic: 'thing we made' },
  { to: '/blog', label: 'Journal', italic: 'notes & ideas' },
  { to: '/careers', label: 'Careers', italic: 'join the team' },
  { to: '/contact', label: 'Contact', italic: "let's talk" },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter / X', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
]

export default function MenuOverlay({ open, onClose }: Props) {
  const listRef = useRef<HTMLUListElement | null>(null)

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Stagger in the link labels when the menu opens
  useEffect(() => {
    if (!open) return
    const list = listRef.current
    if (!list) return
    const items = list.querySelectorAll<HTMLAnchorElement>(`.${styles.link}`)
    gsap.fromTo(
      items,
      { y: '110%' },
      { y: '0%', duration: 0.9, ease: 'power4.out', stagger: 0.06, delay: 0.35 }
    )
  }, [open])

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className={styles.bg}>
        <div className={styles.bgGrad} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.topBar}>
        <Link to="/" className={styles.brand} onClick={onClose} aria-label="Nova Studio — Home">
          <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden>
            <defs>
              <linearGradient id="menulogo" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#7c5cff" />
                <stop offset="100%" stopColor="#ff6bd8" />
              </linearGradient>
            </defs>
            <path d="M16 18 L32 50 L48 18 L40 18 L32 34 L24 18 Z" fill="url(#menulogo)" />
          </svg>
          <span className={styles.brandText}>NOVA<span className={styles.brandDim}>Studio</span></span>
        </Link>

        <button className={styles.close} onClick={onClose} aria-label="Close menu">
          <span>Close</span>
          <span className={styles.closeIcon} aria-hidden />
        </button>
      </div>

      <div className={styles.body}>
        <nav className={styles.nav} aria-label="Primary">
          <span className={styles.navLabel}>Navigation</span>
          <ul className={styles.list} ref={listRef}>
            {links.map((l, i) => (
              <li key={l.to} className={styles.item}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.linkVisible : ''}`}
                >
                  <span className={styles.linkLabel}>
                    <span className={styles.linkNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{l.label}</span>
                    <span className={styles.linkItalic}>{l.italic}</span>
                  </span>
                  <svg className={styles.linkArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <aside className={styles.sidebar}>
          <div className={styles.sideBlock}>
            <span className={styles.sideLabel}>Studio</span>
            <span className={styles.sideValue}>
              <span className={styles.italic}>Crafting</span> premium digital experiences <span className={styles.italic}>for ambitious brands</span>
            </span>
          </div>

          <div className={styles.sideBlock}>
            <span className={styles.sideLabel}>Get in touch</span>
            <a className={styles.sideLink} href="mailto:hello@nova.studio">hello@nova.studio</a>
            <a className={styles.sideLink} href="tel:+10000000000">+1 (000) 000-0000</a>
          </div>

          <div className={styles.sideBlock}>
            <span className={styles.sideLabel}>Studio hours</span>
            <span className={styles.sideValue}>
              Mon — Fri · 9:00 — 18:00 <span className={styles.italic}>(UTC)</span>
            </span>
          </div>

          <div className={styles.sideBlock}>
            <span className={styles.sideLabel}>Elsewhere</span>
            <div className={styles.socialRow}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.footer}>
        <span>© {new Date().getFullYear()} Nova Studio</span>
        <span>Press <span className={styles.italic}>esc</span> to close</span>
      </div>
    </div>
  )
}
