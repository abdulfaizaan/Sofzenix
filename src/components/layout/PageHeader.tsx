import { useReveal } from '../../hooks/useReveal'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  subtitle: string
  eyebrow?: string
}

export default function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  const ref = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 })
  
  return (
    <section className={styles.wrap} ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={styles.inner}>
          {eyebrow && <span className="mono" data-reveal>{eyebrow}</span>}
          <h1 className="h-1" data-reveal>{title}</h1>
          <p className={styles.subtitle} data-reveal>{subtitle}</p>
        </div>
      </div>
    </section>
  )
}
