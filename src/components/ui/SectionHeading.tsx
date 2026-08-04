import { useTextSplit } from '../../hooks/useTextSplit'
import styles from './SectionHeading.module.css'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  level?: 1 | 2 | 3
}

export default function SectionHeading({ eyebrow, title, description, align = 'left', level = 2 }: Props) {
  const Tag = (`h${level}` as 'h1' | 'h2' | 'h3')
  const ref = useTextSplit({ stagger: 0.05 })

  return (
    <div className={`${styles.head} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow && <span className={`mono ${styles.eyebrow}`}>{eyebrow}</span>}
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={styles.title}>{title}</Tag>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  )
}