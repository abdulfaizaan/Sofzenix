import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import SectionHeading from '../../components/ui/SectionHeading'
import Tag from '../../components/ui/Tag'
import { useReveal } from '../../hooks/useReveal'
import styles from './FeaturedWork.module.css'

export default function FeaturedWork() {
  const [active, setActive] = useState<string | null>(null)
  const ref = useReveal({ selector: '.item', y: 60, stagger: 0.12 })
  const featured = projects.slice(0, 4)

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Selected work"
            title="A small selection of recent projects."
            description="Banking, wellness, AI, e-commerce. Different categories, same level of craft."
          />
          <Link to="/portfolio" className={styles.viewAll}>View all →</Link>
        </div>
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {featured.map((p, i) => (
            <Link
              to={`/portfolio#${p.slug}`}
              key={p.id}
              className={`item ${styles.item} ${i % 2 === 1 ? styles.itemShift : ''}`}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              data-cursor-view
            >
              <div className={styles.cover} style={{ background: p.cover }}>
                <div className={styles.year}>{p.year}</div>
                <div className={styles.bigText} style={{ color: p.accent }}>
                  {p.client}
                </div>
              </div>
              <div className={styles.meta}>
                <div className={styles.tags}>
                  {p.tags.map((t) => <Tag key={t} size="sm" variant="outline">{t}</Tag>)}
                </div>
                <h3 className={styles.title}>{p.title}</h3>
                <div className={styles.foot}>
                  <span className={styles.client}>{p.client}</span>
                  <span className={`${styles.arrow} ${active === p.id ? styles.arrowActive : ''}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}