import { services } from '../../data/services'
import ServiceDetail from './ServiceDetail'
import { useReveal } from '../../hooks/useReveal'
import styles from './ServiceGrid.module.css'

export default function ServiceGrid() {
  const ref = useReveal({ selector: '.svc', y: 60, stagger: 0.12 })
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {services.map((s, i) => (
            <div key={s.id} className="svc" id={s.slug}>
              <ServiceDetail service={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}