import { useEffect, useRef, useState } from 'react'
import { gsap, initGSAP } from '../../lib/gsap'
import styles from './Preloader.module.css'

initGSAP()

type Props = {
  /** Trigger a re-run when the route changes (set false on first mount only). */
  runOnMount?: boolean
  /** Base duration used to calculate animation timing. */
  minDuration?: number
  /** Called when the preloader finishes its reveal. */
  onComplete?: () => void
}

export default function Preloader({ runOnMount = true, minDuration = 1800, onComplete }: Props) {
  const [done, setDone] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const nameRef = useRef<HTMLDivElement | null>(null)
  const ranRef = useRef(false)

  useEffect(() => {
    if (!runOnMount && ranRef.current) return
    ranRef.current = true

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const panel = panelRef.current
    const name = nameRef.current

    if (!panel || !name) return

    if (reduced) {
      gsap.set(panel, { yPercent: -100 })
      setDone(true)
      onComplete?.()
      return
    }

    const tl = gsap.timeline({
      delay: 0.2, // Small initial delay so it doesn't snap instantly
      onComplete: () => {
        setDone(true)
        onComplete?.()
      }
    })

    // 1. Show name (fade in from right to left, slowly revealing)
    tl.fromTo(
      name,
      { opacity: 0, x: 60, clipPath: 'inset(0 0 0 100%)' },
      { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)', duration: 1.4, ease: 'power3.out' }
    )
    
    // 2. Hide name
    tl.to(name, { opacity: 0, x: -20, duration: 0.5, ease: 'power2.in' }, '+=0.4')

    // 3. Slide up panel
    tl.to(panel, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1')

    return () => { tl.kill() }
  }, [runOnMount, onComplete])

  if (done) return null

  return (
    <div className={styles.preloader} aria-hidden="true">
      <div ref={panelRef} className={styles.panel}>
        <div ref={nameRef} className={styles.name}>Nova Studio</div>
      </div>
    </div>
  )
}
