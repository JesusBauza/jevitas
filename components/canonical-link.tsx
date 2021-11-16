import { getAbsoluteURL, getDefaultHost, useCanonical } from '@/lib/utils/client'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren, CSSProperties } from 'react'

export type CanonicalLinkProps = LinkProps & {
  title?: string
  style?: CSSProperties
  id?: string
  className?: string
  canonical?: boolean
}

const CanonicalLink = ({ canonical, href, children, shallow, ...props }: PropsWithChildren<CanonicalLinkProps>) => {
  return (
    <Link {...props} href={href} shallow={shallow}>
      <a {...props}>
        {children}
      </a>
    </Link>
  )
}

export default CanonicalLink
