import { useReveal } from '../../hooks/useReveal'
import ContactForm from './ContactForm'
import MapEmbed from './MapEmbed'
import WhatsAppLink from './WhatsAppLink'
import styles from './index.module.css'

export default function ContactPage() {
  const ref = useReveal({ selector: '.col', y: 40, stagger: 0.1 })
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.head}>
          <span className="mono">Contact</span>
          <h1>Let's start a <span className="gradient-text">conversation.</span></h1>
          <p>Pick a channel. We reply within 24 hours — usually much faster.</p>
        </div>

        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          <div className={`col ${styles.col}`}>
            <ContactForm />
          </div>
          <div className={`col ${styles.col}`}>
            <MapEmbed />
            <div className={styles.channels}>
              <Channel icon="mail" label="Email" value="contact@sofzenix.in" href="mailto:contact@sofzenix.in" />
              <Channel icon="phone" label="Phone" value="+91 63058 18324" href="tel:+916305818324" />
              <Channel icon="loc" label="HQ" value="Narasaraopeta, AP" />
            </div>
            <WhatsAppLink />
          </div>
        </div>
      </div>
    </section>
  )
}

function Channel({ icon, label, value, href }: { icon: 'mail' | 'phone' | 'loc'; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="mono">{label}</span>
      <span className={styles.chanValue}>{value}</span>
    </>
  )
  return href ? (
    <a className={styles.channel} href={href}>{inner}</a>
  ) : (
    <div className={styles.channel}>{inner}</div>
  )
}