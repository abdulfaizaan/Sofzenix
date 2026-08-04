import styles from './FilterBar.module.css'

type Filter = 'all' | 'web' | 'mobile' | 'branding' | 'marketing'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'branding', label: 'Branding' },
  { id: 'marketing', label: 'Marketing' },
]

export default function FilterBar({
  active,
  onChange,
  count,
}: {
  active: Filter
  onChange: (f: Filter) => void
  count: number
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className={`${styles.filter} ${active === f.id ? styles.active : ''}`}
            data-cursor-hover
          >
            {f.label}
          </button>
        ))}
      </div>
      <span className={`mono ${styles.count}`}>{count} projects</span>
    </div>
  )
}