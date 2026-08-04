import styles from './MapEmbed.module.css'

export default function MapEmbed() {
  return (
    <div className={styles.wrap}>
      <iframe
        title="Nova Studio — Bengaluru"
        src="https://maps.google.com/maps?q=Indiranagar%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={styles.map}
      />
      <div className={styles.overlay} aria-hidden />
    </div>
  )
}