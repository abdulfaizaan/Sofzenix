import { useEffect } from 'react'
import { gsap, initGSAP } from '../../lib/gsap'
import type { Project } from '../../types'
import styles from './ProjectModal.module.css'

initGSAP()

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    document.body.style.overflow = 'hidden'
    if (reduced) return

    const el = document.getElementById('modal')
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power4.out' })
    return () => { document.body.style.overflow = '' }
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div id="modal" className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
        <div className={styles.cover} style={{ background: project.cover }}>
          <span className={styles.big} style={{ color: project.accent }}>{project.client}</span>
        </div>
        <div className="container">
          <div className={styles.body}>
            <div className={styles.head}>
              <span className="mono">{project.year} · {project.category}</span>
              <h2>{project.title}</h2>
              <p className={styles.summary}>{project.summary}</p>
            </div>

            <div className={styles.results}>
              {project.results.map((r) => (
                <div key={r.label} className={styles.stat}>
                  <div className={styles.statVal}>{r.value}</div>
                  <div className={styles.statLabel}>{r.label}</div>
                </div>
              ))}
            </div>

            <div className={styles.gallery}>
              {project.gallery.map((bg, i) => (
                <div key={i} className={styles.frame} style={{ background: bg }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}