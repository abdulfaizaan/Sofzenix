import { useEffect, useRef } from 'react'
import { gsap, initGSAP } from '../../lib/gsap'
import { useTextSplit } from '../../hooks/useTextSplit'
import styles from './Story.module.css'

initGSAP()

export default function Story() {
  const root = useRef<HTMLElement | null>(null)
  const titleRef = useTextSplit({ stagger: 0.04 })

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.fromTo(el.querySelectorAll('[data-para]'), {
      opacity: 0, y: 30,
    }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 70%' },
    })
  }, [])

  return (
    <section className={styles.wrap} ref={root}>
      <div className="container">
        <div className={styles.head}>
          <span className="mono">About Sofzenix</span>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={styles.title}>
            Engineering Excellence & Trust.
          </h2>
        </div>
        <div className={styles.body}>
          <p data-para>
            At Sofzenix IT Solutions LLP, we continuously research and prototype new AI capabilities to deliver competitive advantages for your product. Our focus is on <span className="gradient-text">product quality</span>, system security, and transparent client partnerships.
          </p>
          <p data-para>
            We build with state-of-the-art tech stacks including React, Node, AWS, Docker, Kubernetes, and Python. System topologies are engineered from day one to handle high traffic volume, database expansion, and seamless updates.
          </p>
          <p data-para>
            Implementation of industry-standard authentication protocols (OAuth, JWT), encryption at rest and in transit, and security audits ensure that we deliver enterprise-grade digital solutions.
          </p>
        </div>
      </div>
    </section>
  )
}