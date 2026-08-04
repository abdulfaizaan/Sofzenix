import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { posts } from '../../data/posts'
import { gsap, initGSAP } from '../../lib/gsap'
import ShareButtons from './ShareButtons'
import styles from './ArticleDetail.module.css'

initGSAP()

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)
  const root = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!post || !root.current) return
    window.scrollTo(0, 0)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    gsap.fromTo(root.current.querySelectorAll('[data-a]'), {
      opacity: 0, y: 30,
    }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    })
  }, [post])

  if (!post) {
    return (
      <section className={styles.wrap}>
        <div className="container">
          <h2>Post not found</h2>
          <Link to="/blog">Back to journal →</Link>
        </div>
      </section>
    )
  }

  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <article className={styles.wrap} ref={root}>
      <header className={styles.head}>
        <div className="container">
          <Link to="/blog" className={styles.back} data-a>← All articles</Link>
          <span className="mono" data-a>{post.category} · {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readTime} min read</span>
          <h1 data-a className={styles.title}>{post.title}</h1>
          <p data-a className={styles.excerpt}>{post.excerpt}</p>
          <div data-a className={styles.byline}>By {post.author}</div>
        </div>
      </header>

      <div className="container">
        <div data-a className={styles.body}>
          {post.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div data-a className={styles.share}>
          <span className="mono">Share</span>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {related.length > 0 && (
          <section className={styles.related}>
            <span className="mono">More in {post.category}</span>
            <div className={styles.grid}>
              {related.map((r) => (
                <Link to={`/blog/${r.slug}`} key={r.id} className={styles.relCard}>
                  <h4>{r.title}</h4>
                  <span>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}