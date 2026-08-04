import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import styles from './Navbar.module.css'

type Props = {
  onMenuClick: () => void
  menuOpen: boolean
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Work' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ onMenuClick, menuOpen }: Props) {
  const progress = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand} aria-label="Nova Studio — Home">
            <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden>
              <defs>
                <linearGradient id="navlogo" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent-3)" />
                </linearGradient>
              </defs>
              <path d="M16 18 L32 50 L48 18 L40 18 L32 34 L24 18 Z" fill="url(#navlogo)" />
            </svg>
            <span className={styles.brandText}>NOVA<span className={styles.brandDim}>Studio</span></span>
          </Link>

          <div className={styles.right}>
            <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
              )}
            </button>

            <Link to="/contact" className={styles.cta}>
              Start a project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>

            <button
              className={styles.menuTrigger}
              onClick={onMenuClick}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={styles.menuLabel}>{menuOpen ? 'Close' : 'Menu'}</span>
              <span className={styles.menuIcon} aria-hidden>
                <span className={`${styles.menuBar} ${menuOpen ? styles.barTopOpen : ''}`} />
                <span className={`${styles.menuBar} ${menuOpen ? styles.barMidOpen : ''}`} />
                <span className={`${styles.menuBar} ${menuOpen ? styles.barBotOpen : ''}`} />
              </span>
            </button>
          </div>
        </div>
        <div
          className={styles.progress}
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </header>
    </>
  )
}
