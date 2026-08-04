import type { Service } from '../../types'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
import styles from './ServiceDetail.module.css'

const icons: Record<string, JSX.Element> = {
  web: <path d="M3 7h18M3 12h18M3 17h12" />,
  mobile: <path d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM11 18h2" />,
  design: <path d="M4 4h16v6H4zM4 14h10v6H4zM18 14l4 6" />,
  marketing: <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />,
  branding: <path d="M12 2l3 7h7l-5.5 4 2 8L12 17l-6.5 4 2-8L2 9h7z" />,
}

export default function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const ref = useReveal({ selector: 'h2, p, li, a', y: 30, stagger: 0.07 })
  return (
    <article
      className={styles.detail}
      ref={ref as React.RefObject<HTMLElement>}
      data-reverse={index % 2 === 1 ? 'true' : undefined}
    >
      <div className={styles.copy}>
        <div className={styles.label}>
          <span className="mono">0{index + 1} · {service.title}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
            {icons[service.icon]}
          </svg>
        </div>
        <h2>{service.title}</h2>
        <p className={styles.tagline}>{service.tagline}</p>
        <p className={styles.body}>{service.description}</p>
        <ul className={styles.capabilities}>
          {service.capabilities.map((c) => (
            <li key={c}>
              <span className={styles.bullet} />
              {c}
            </li>
          ))}
        </ul>
        <Link to="/contact" className={styles.cta}>
          <span>Start a {service.title.toLowerCase()} project</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </Link>
      </div>
      <div className={styles.visual}>
        <div className={styles.card} >
          <div className={styles.cardBig}>{service.title}</div>
          <div className={styles.cardGlow} />
        </div>
      </div>
    </article>
  )
}