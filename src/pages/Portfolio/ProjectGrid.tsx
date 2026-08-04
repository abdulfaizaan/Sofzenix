import { useMemo, useState } from 'react'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import FilterBar from './FilterBar'
import ProjectModal from './ProjectModal'
import styles from './ProjectGrid.module.css'
import Tag from '../../components/ui/Tag'

type Filter = 'all' | 'web' | 'mobile' | 'branding' | 'marketing'

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Project | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section className={styles.wrap}>
      <div className="container">
        <FilterBar active={filter} onChange={setFilter} count={filtered.length} />
        <div className={styles.grid} key={filter /* re-trigger transitions per filter */}>
          {filtered.map((p, i) => (
            <button
              key={p.id}
              className={`${styles.card} ${i % 3 === 1 ? styles.shift : ''}`}
              onClick={() => setOpen(p)}
              data-cursor-view
            >
              <div className={styles.cover} style={{ background: p.cover }}>
                <span className={styles.year}>{p.year}</span>
                <span className={styles.big} style={{ color: p.accent }}>
                  {p.client}
                </span>
                <div className={styles.coverFoot}>
                  <span className={styles.view}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                    View case study
                  </span>
                </div>
              </div>
              <div className={styles.meta}>
                <div className={styles.tags}>
                  {p.tags.map((t) => <Tag key={t} size="sm" variant="outline">{t}</Tag>)}
                </div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.summary}>{p.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}