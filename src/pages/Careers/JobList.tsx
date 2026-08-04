import { useState } from 'react'
import { jobs } from '../../data/jobs'
import { useReveal } from '../../hooks/useReveal'
import ApplicationForm from './ApplicationForm'
import Tag from '../../components/ui/Tag'
import styles from './JobList.module.css'

export default function JobList() {
  const [active, setActive] = useState<string | null>(null)
  const ref = useReveal({ selector: '.job', y: 30, stagger: 0.07 })

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.list} ref={ref as React.RefObject<HTMLDivElement>}>
          {jobs.map((j) => {
            const open = active === j.id
            return (
              <div key={j.id} className={`job ${styles.job} ${open ? styles.open : ''}`}>
                <button className={styles.row} onClick={() => setActive(open ? null : j.id)} aria-expanded={open}>
                  <div className={styles.left}>
                    <h3 className={styles.title}>{j.title}</h3>
                    <div className={styles.meta}>
                      <Tag size="sm" variant={j.type === 'internship' ? 'accent' : 'default'}>{j.type}</Tag>
                      <span>{j.department}</span>
                      <span>·</span>
                      <span>{j.location}</span>
                    </div>
                  </div>
                  <span className={`${styles.chev} ${open ? styles.chevOpen : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className={styles.expand} data-open={open}>
                  <div className={styles.expandInner}>
                    <p className={styles.desc}>{j.description}</p>
                    <div className={styles.cols}>
                      <div>
                        <h4 className="mono">What you'll do</h4>
                        <ul>{j.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="mono">What we're looking for</h4>
                        <ul>{j.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
                      </div>
                    </div>
                    <ApplicationForm jobTitle={j.title} jobId={j.id} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}