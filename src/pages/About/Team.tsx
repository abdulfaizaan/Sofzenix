import { team } from '../../data/team'
import { useReveal } from '../../hooks/useReveal'
import styles from './Team.module.css'

export default function Team() {
  const ref = useReveal({ selector: '.member', y: 40, stagger: 0.08 })
  return (
    <section className={styles.wrap}>
      <div className="container">
        <span className="mono">The team</span>
        <h2 className="h-1">Senior people, on every project.</h2>
        <p className={styles.lede}>
          28 people across product design, engineering, motion and strategy. No juniors, no outsourcing —
          the people you meet at the pitch are the people who build the work.
        </p>
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {team.map((m) => (
            <article key={m.id} className={`member ${styles.member}`}>
              <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${m.accent} 0%, var(--bg-3) 100%)` }}>
                <span>{m.initials}</span>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{m.name}</h3>
                <span className={`mono ${styles.role}`}>{m.role}</span>
                <p className={styles.bio}>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}