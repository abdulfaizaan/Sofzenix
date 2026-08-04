import { Link } from 'react-router-dom'
import { useMagnetic } from '../../hooks/useMagnetic'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost'

type CommonProps = {
  variant?: Variant
  children: React.ReactNode
  className?: string
  magnetic?: boolean
}

type AsLink = CommonProps & { to: string; href?: never; onClick?: never }
type AsAnchor = CommonProps & { href: string; to?: never; onClick?: never }
type AsButton = CommonProps & { onClick?: () => void; to?: never; href?: never }

type Props = AsLink | AsAnchor | AsButton

export default function Button(props: Props) {
  const { variant = 'primary', children, className = '', magnetic = false } = props
  const innerRef = useMagnetic(magnetic ? 0.25 : 0)

  const cls = `${styles.btn} ${styles[variant]} ${className}`

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls} ref={innerRef as React.RefObject<HTMLAnchorElement>}>
        <span>{children}</span>
      </Link>
    )
  }
  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={cls} ref={innerRef as React.RefObject<HTMLAnchorElement>} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
      </a>
    )
  }
  return (
    <button type="button" onClick={props.onClick} className={cls} ref={innerRef as React.RefObject<HTMLButtonElement>}>
      <span>{children}</span>
    </button>
  )
}