import { useReveal } from '../../hooks/useReveal'
import styles from './VisionMission.module.css'

const items = [
  {
    label: 'Innovation First',
    title: 'Research and prototyping.',
    body: 'We continuously research and prototype new AI capabilities to deliver competitive advantages for your product.',
  },
  {
    label: 'Enterprise Quality',
    title: 'Robust standards and QA.',
    body: 'We follow robust coding standards, automated testing pipelines, and rigid QA checkpoints to ensure production stability.',
  },
  {
    label: 'Agile Development',
    title: 'Rapid iteration and transparency.',
    body: 'Weekly sprint reviews, dedicated PM dashboards, and high transparency let us pivot rapidly on feedback.',
  },
]

export default function VisionMission() {
  const ref = useReveal({ selector: '.card', y: 40, stagger: 0.1 })
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {items.map((it) => (
            <div key={it.label} className={`card ${styles.card}`}>
              <span className="mono">{it.label}</span>
              <h3 className={styles.title}>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}