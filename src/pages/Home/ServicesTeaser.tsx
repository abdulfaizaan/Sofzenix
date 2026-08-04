import { Link } from 'react-router-dom'
import SectionHeading from '../../components/ui/SectionHeading'
import { services } from '../../data/services'
import { useReveal } from '../../hooks/useReveal'
import styles from './ServicesTeaser.module.css'

const icons: Record<string, JSX.Element> = {
  web: <path d="M3 7h18M3 12h18M3 17h12" />,
  mobile: <path d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM11 18h2" />,
  design: <path d="M4 4h16v6H4zM4 14h10v6H4zM18 14l4 6" />,
  marketing: <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />,
  branding: <path d="M12 2l3 7h7l-5.5 4 2 8L12 17l-6.5 4 2-8L2 9h7z" />,
}

export default function ServicesTeaser() {
  const ref = useReveal({ selector: '.card', y: 40, stagger: 0.1 })
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Services"
            title="What we make, end to end."
            description="Five services, one team. Pick what you need — or hire us for the whole arc."
          />
          <Link to="/services" className={styles.viewAll}>
            All services →
          </Link>
        </div>
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {services.map((s, i) => (
            <Link to={`/services#${s.slug}`} key={s.id} className={`card ${styles.card}`} data-cursor-hover>
              <span className={styles.idx}>0{i + 1}</span>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {icons[s.icon]}
              </svg>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.tagline}>{s.tagline}</p>
              <span className={styles.arrow} aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}