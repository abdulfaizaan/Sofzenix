import { useMarquee } from '../../hooks/useMarquee'
import styles from './Marquee.module.css'

type Item = string | { text: string; accent?: string }

type Props = {
  items: Item[]
  speed?: number
  direction?: 'left' | 'right'
  separator?: React.ReactNode
  className?: string
}

export default function Marquee({ items, speed = 60, direction = 'left', separator, className = '' }: Props) {
  const ref = useMarquee({ speed, direction })
  const sep = separator ?? <span className={styles.sep}>✦</span>

  return (
    <div className={`${styles.marquee} ${className}`} ref={ref as React.RefObject<HTMLDivElement>} aria-hidden>
      <div className={styles.track} data-marquee-track>
        {items.map((it, i) => (
          <span key={i} className={styles.item} style={typeof it === 'object' && it.accent ? { color: it.accent } : undefined}>
            {typeof it === 'string' ? it : it.text}
            {sep}
          </span>
        ))}
      </div>
    </div>
  )
}