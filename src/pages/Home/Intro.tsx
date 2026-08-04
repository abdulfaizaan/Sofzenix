import Marquee from '../../components/ui/Marquee'
import { useReveal } from '../../hooks/useReveal'
import styles from './Intro.module.css'

const items = ['Software Engineering', 'App Development', 'Growth Marketing', 'Cognitive Systems', 'Product Design', 'CRM Solutions']

export default function Intro() {
  const ref = useReveal({ selector: 'p, span, h2', y: 30, stagger: 0.08 })
  return (
    <section className={styles.intro} ref={ref as React.RefObject<HTMLElement>}>
      <div className={styles.marquee}>
        <Marquee items={items} speed={50} />
      </div>
      <div className="container">
        <div className={styles.grid}>
          <span className="mono">What we do</span>
          <h2 className="h-1">
            Six practice areas engineered to design, build, and scale digital products — with unified lifecycle ownership.
          </h2>
        </div>
      </div>
    </section>
  )
}