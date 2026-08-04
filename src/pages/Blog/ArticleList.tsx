import { useMemo, useState } from 'react'
import { posts } from '../../data/posts'
import ArticleCard from './ArticleCard'
import { useReveal } from '../../hooks/useReveal'
import styles from './ArticleList.module.css'

const cats = ['all', 'design', 'engineering', 'studio', 'insights'] as const
type Cat = (typeof cats)[number]

export default function ArticleList() {
  const [cat, setCat] = useState<Cat>('all')
  const ref = useReveal({ selector: '.post', y: 30, stagger: 0.08 })

  const filtered = useMemo(() => (cat === 'all' ? posts : posts.filter((p) => p.category === cat)), [cat])
  const [featured, ...rest] = filtered

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.filters}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`${styles.filter} ${cat === c ? styles.active : ''}`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <div className={styles.featured} ref={ref as React.RefObject<HTMLDivElement>}>
            <ArticleCard post={featured} size="lg" />
          </div>
        )}

        <div className={styles.grid}>
          {rest.map((p) => (
            <div key={p.id} className="post">
              <ArticleCard post={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}