import { Link } from 'react-router-dom'
import type { Post } from '../../types'
import styles from './ArticleCard.module.css'

const accentBy = {
  design: '#7c5cff',
  engineering: '#4ee0c4',
  studio: '#ff6bd8',
  insights: '#f59e0b',
} as const

export default function ArticleCard({ post, size = 'md' }: { post: Post; size?: 'sm' | 'md' | 'lg' }) {
  const a = accentBy[post.category]
  return (
    <Link to={`/blog/${post.slug}`} className={`${styles.card} ${styles[size]}`} data-cursor-view>
      <div className={styles.cover} style={{ background: `linear-gradient(135deg, ${a} 0%, var(--bg-3) 100%)` }}>
        <span className={styles.tag}>{post.category}</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {post.readTime} min read</span>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.author}>— {post.author}</span>
      </div>
    </Link>
  )
}