import styles from './Tag.module.css'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline'
  size?: 'sm' | 'md'
}

export default function Tag({ children, variant = 'default', size = 'md' }: Props) {
  return <span className={`${styles.tag} ${styles[variant]} ${styles[size]}`}>{children}</span>
}