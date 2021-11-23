import { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import Link from '@/components/canonical-link'
import { UrlObject } from 'url'
import Loader from 'react-loader-spinner'
import { useTheme } from './page'
import styles from './button.module.css'

enum loadingColor {
  primary = 'border-fg-primary bg-fg-primary text-bg-primary',
}

declare type Url = string | UrlObject

export type ButtonType = 'primary' | 'secondary' | 'vintage' | 'pink' | 'green'

export type ButtonProps = {
  loading?: boolean
  disabled?: boolean
  shallow?: boolean
  canonical?: boolean
  rounded?: boolean
  icon?: ReactNode
  type?: ButtonType
  title?: string
  href?: Url
  className?: string
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
  btnType?: 'button' | 'submit' | 'reset'
}

export const Button = (props: ButtonProps) => {
  const {
    loading,
    disabled,
    shallow,
    rounded = true,
    title,
    type = 'primary',
    href,
    icon,
    onClick,
    children,
    style,
  } = props
  const classes = `${rounded ? 'rounded-full' : ''} font-bold text-xs lg:text-base transform hover:translate-y-[-4px] hover:scale-[1.05] disabled:opacity-50 py-3 lg:py-3 hover:shadow-lg px-6 lg:px-8 items-center inline-flex ${loading ? loadingColor[type] : styles[type]} ${props.className ? props.className : ''}`

  const theme = useTheme()

  const content = (
    <>
      {loading ? (
        <Loader color={theme.background.primary} type="Watch" width={24} height={24} />
      ) : (
        <>
          {icon && (
            <span className={children ? 'pr-2' : ''}>{icon}</span>
          )}
          {title}
          {children}
        </>
      )}
    </>
  )

  return href ? (
    <Link className={classes} href={href} shallow={shallow} style={{
      ...(style || {}),
      pointerEvents: loading || disabled ? 'none' : 'unset',
      willChange: 'transform',
      transition: 'transform 0.6s, 0.6s color, 0.6s box-shadow, 0.6s background-color, 0.6s border-color, 0s opacity',
    }}>
      {content}
    </Link>
  ) : (
    <button disabled={disabled} onClick={!loading ? onClick : undefined} className={classes} style={{
      ...(style || {}),
      pointerEvents: loading || disabled ? 'none' : 'unset',
      cursor: disabled ? 'not-allowed' : 'pointer',
      willChange: 'transform',
      transition: 'transform 0.6s, 0.6s color, 0.6s box-shadow, 0.6s background-color, 0.6s border-color, 0s opacity',
    }} type={props.btnType}>
      {content}
    </button>
  )
}
