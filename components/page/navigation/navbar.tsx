import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import Link from '@/components/canonical-link'
import Sidebar from './sidebar'
import Dropdown from './dropdown'
import s from './styles/navbar.module.css'
import nav from '@/lib/navigation'
import { useGlobalDataContext } from '@/components/page'
import { Button } from '@/components/button'
import { useRouter } from 'next/router'
import Navigation from '@/lib/navigation'
import { useCanonical } from '@/lib/utils/client'
import { useBrandLayout } from '@/models/page/brand-layout/context'
import { Squeeze as Hamburger } from 'hamburger-react'
import LogoSVG from '@/public/images/logo.svg'

export default function Navbar({
  canonical,
}: {
  canonical?: boolean
}) {
  const [sidebar, setSidebar] = useState(false)
  const toggleSidebar = () => (setSidebar(!sidebar))
  const globalData = useGlobalDataContext()
  const isCanonical = useCanonical()

  const [brand] = useBrandLayout()
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
            <div className="mr-4 text-sm items-center hidden lg:flex h-full">
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
            <Button title="Conócenos" href="/contacto" className="text-sm z-10 lg:mr-4" type="secondary" />
            {Navigation(globalData).length ? (
              <div className="ml-2 lg:hidden">
                <style jsx global>{`
                .hamburger-react * {
                  transition-property: transform !important; 
                }
                `}</style>
                <Hamburger toggled={sidebar} toggle={toggleSidebar} size={24} rounded hideOutline />
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  )
}
