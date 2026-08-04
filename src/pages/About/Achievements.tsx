import { useEffect, useRef } from 'react'
import { achievements } from '../../data/team'
import { gsap, ScrollTrigger, initGSAP } from '../../lib/gsap'
import styles from './Achievements.module.css'

initGSAP()

export default function Achievements() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    el.querySelectorAll('[data-num]').forEach((node) => {
      const target = parseFloat(node.getAttribute('data-num') || '0')
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
        onUpdate: () => {
          const isFloat = !Number.isInteger(target)
          const val = Number(obj.v)
          node.textContent = isFloat ? val.toFixed(1) : Math.round(val).toString()
        },
      })
    })
  }, [])

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.grid} ref={ref}>
          {achievements.map((a, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.value}>
                <span data-num={a.value}>{a.value}</span>
                {a.suffix && <span className={styles.suffix}>{a.suffix}</span>}
              </div>
              <span className={`mono ${styles.label}`}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}