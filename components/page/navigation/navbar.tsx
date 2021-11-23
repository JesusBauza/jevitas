import { Fragment, useCallback, useState } from 'react'
import Link from '@/components/canonical-link'
import Sidebar from './sidebar'
import Dropdown from './dropdown'
import s from './styles/navbar.module.css'
import nav from '@/lib/navigation'
import { useGlobalDataContext } from '@/components/page'
import { useRouter } from 'next/router'
import Navigation from '@/lib/navigation'
import { useCanonical } from '@/lib/utils/client'
import { Spin as Hamburger } from 'hamburger-react'
import LogoSVG from '@/public/images/logo.svg'
import Anchor from '../svg/spotify.svg'
import Ig from '../svg/ig.svg'
import Cart from '../svg/cart.svg'
import Mail from '../svg/mail.svg'

export default function Navbar({
  canonical,
}: {
  canonical?: boolean
}) {
  const [sidebar, setSidebar] = useState(false)
  const toggleSidebar = () => (setSidebar(!sidebar))
  const globalData = useGlobalDataContext()
  const isCanonical = useCanonical()

  const { query, pathname } = useRouter()

  const isActive = useCallback((path: string) => path === '/' ? path === pathname : pathname.startsWith(path), [pathname])

  return (
    <>
      <header className={`${s.header}`}>
        <Sidebar open={sidebar} toggle={toggleSidebar} />
        <div className={`${s.headerWrapper} c-lg`}>
          <div className="flex pointer-events-auto items-center">
            <h1 className="font-bold font-title text-xl text-fg-primary transform transition-transform duration-200 select-none sm:text-4xl hover:scale-95">
              <Link title="Jevitas Intensas" href="/">
                <LogoSVG className="w-[100px] sm:w-[130px]" />
              </Link>
            </h1>
          </div>
          <div className={s.elements}>
            <div className="text-sm items-center hidden lg:flex h-full">
              {nav(globalData).map((n, i) => n.childrens ? (
                <Fragment key={i}>
                  <Dropdown titulo={n.titulo} links={n.childrens} />
                </Fragment>
              ) : (
                <Link
                  key={i}
                  href={n.href || '/'}
                  className={`${s.element} ${isActive(n.href) ? s.active : ''}`}
                  style={{
                    transition: '0.2s border-color, 0s color'
                  }}
                  canonical={isCanonical || canonical}
                >
                  {n.titulo}
                </Link>
              ))}
            </div>
            <div className="space-x-4 items-center ml-4 hidden lg:flex">
              <a href="https://anchor.fm/jevitasintensas" target="_blank">
                <Anchor />
              </a>
              <a href="https://www.instagram.com/jevitasintensas/" target="_blank">
                <Ig />
              </a>
              <a href="mailto:annella@jevitasintensas.com" target="_blank">
                <Mail />
              </a>
              <Link
                href="/tiendita"
              >
                <Cart />
              </Link>
            </div>
            {Navigation(globalData).length ? (
              <div className="ml-2 lg:hidden text-fg-primary">
                <style jsx global>{`
                .hamburger-react * {
                  transition-property: transform !important; 
                }
                `}</style>
                <Hamburger direction="left" toggled={sidebar} toggle={toggleSidebar} size={24} rounded hideOutline />
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  )
}
