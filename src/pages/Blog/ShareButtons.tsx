import styles from './ShareButtons.module.css'

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : `https://nova.studio/blog/${slug}`

  const links = [
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: (
        <path d="M22 5.92a8.19 8.19 0 0 1-2.36.65 4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1A4.1 4.1 0 0 0 11.85 9a11.65 11.65 0 0 1-8.46-4.29 4.1 4.1 0 0 0 1.27 5.47 4.07 4.07 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.41a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67l-.01-.53A8.3 8.3 0 0 0 22 5.92z" />
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.34 9.84h-2.67v-4.34c0-1.03-.02-2.36-1.44-2.36-1.44 0-1.66 1.13-1.66 2.29v4.41H10V9.67h2.56v1.18h.04c.36-.68 1.23-1.4 2.54-1.4 2.72 0 3.22 1.79 3.22 4.12v4.77z" />
      ),
    },
    {
      name: 'Copy link',
      href: '#',
      icon: (
        <>
          <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
          <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
        </>
      ),
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(url)
      },
    },
  ]

  return (
    <div className={styles.row}>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          onClick={(e) => l.onClick?.(e)}
          target={l.name === 'Copy link' ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={styles.btn}
          aria-label={`Share on ${l.name}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">{l.icon}</svg>
        </a>
      ))}
    </div>
  )
}