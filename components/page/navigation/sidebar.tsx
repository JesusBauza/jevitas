import { RefObject, CSSProperties, useState, createContext, useContext } from 'react'
import { useRef, useEffect } from 'react'
import links from '@/lib/navigation'
import Link from 'next/link'
import s from './styles/sidebar.module.css'
import { useGlobalDataContext } from '@/components/page'
import dynamic from 'next/dynamic'
import { useDarkMode } from '@/lib/dark-mode'
import Cloud from '@www/home/nube.svg'
import Fig from '@www/home/hero-fig2.svg'

const DarkModeSwitch = dynamic(import('react-toggle-dark-mode').then(m => m.DarkModeSwitch), {
  ssr: false
})

interface ChildrenMenu {
  title?: string
  childrens?: any[]
}

type ChildState = [ChildrenMenu, React.Dispatch<ChildrenMenu>]

const sidebarContext = createContext<ChildState>([null, null])
const useChildState = () => useContext(sidebarContext)

const ParentLink = (link: {
  idx: number,
  title?: string,
  href?: string,
  childrens?: any[],
  toggle?: () => void
}) => {
  const { idx, title, href, childrens, toggle } = link
  const css: CSSProperties = { animationDelay: `${(( idx ) * 200) - 300}ms` as string, paddingRight: '0.5rem' }
  const [, setChildMenu] = useChildState()
  if (childrens) {
    return (
      <div className={s.sidebarLink} onClick={() => setChildMenu(link)}>
        <p
          className="cursor-pointer flex text-right items-center"
          style={css}
        >
          {title}
          
          <span
            className="cursor-pointer mt-1 ml-2 i jam:chevron-right"
          />
        </p>
      </div>
    )
  } else {
    return (
      <Link href={href || '/'}>
        <a className={s.sidebarLink} onClick={toggle}>
          <p style={css}>{title}</p>
        </a>
      </Link>
    )
  }
}

const Parents = ({ toggle }: { toggle?: () => void }) => {
  const data = useGlobalDataContext()
  const [isDarkMode, setDarkMode] = useDarkMode()
  return (
    <div className="mb-6" style={{overflowY: 'auto'}}>
      {links(data).map((l, idx) => (
        <ParentLink
          key={idx}
          title={l.titulo}
          idx={idx}
          href={l.href}
          childrens={l.childrens}
          toggle={toggle}
        />
      ))}
    </div>
  )
}

const ChildLink = (link: {
  idx: number,
  title?: string,
  href?: string,
  toggle?: () => void
}) => {
  const { idx, title, href, toggle } = link
  const css: CSSProperties = { animationDelay: `${(( idx - 1 ) * 200) - 300}ms` as string, paddingRight: '0.5rem' }
  return (
    <Link href={href || '/'}>
      <a className={s.childLink} onClick={toggle}>
        <p style={css}>{title}</p>
      </a>
    </Link>
  )
}

const Childs = ({ toggle }: { toggle?: () => void }) => {
  const [childMenu, setChildMenu] = useChildState()
  return (
    <>
      <button
        className={s.backButton}
        onClick={() => setChildMenu(null)}
      >
        <span className="i jam:chevron-left"/>
        Go back
      </button>
      <p className={s.childTitle}>{childMenu.title}</p>
      <div className={s.childMenuWrapper}>
        {childMenu.childrens.map((l, idx) => (
          <ChildLink {...l} title={l.titulo} idx={idx} key={idx} toggle={toggle}/>
        ))}
      </div>
    </>
  )
}

const Wrapper = (props: { toggle?: () => void }) => {
  const [childMenu] = useChildState()

  return (
    <div className={s.sidebarWrapper}>
      {childMenu ? <Childs {...props}/> : <Parents {...props}/>}
    </div>
  )
}

export interface SidebarProps {
  open: boolean
  toggle: () => void
}

const Sidebar = ({ open = false, toggle }: SidebarProps) => {
  const sidebarRef: RefObject<HTMLElement> = useRef(null)
  const sidebarState: ChildState = useState(null)
  const [,setSidebarState] = sidebarState

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open)
    document.documentElement.classList.toggle('lg:overflow-auto', open)
  }, [open])

  useEffect(() => {
    if (!open) {
      setSidebarState(null)
    }
  }, [open])

  return (
    <sidebarContext.Provider value={sidebarState}>
      <aside
        className={`${s.sidebar} relative ${open ? 'open' : ''}`}
        ref={sidebarRef}
        style={{ opacity: `${open ? '1' : '0'}` }}
      >
        <div className="absolute flex w-full h-full items-center overflow-hidden">
          <Fig className="transform -translate-y-16 scale-x-[-1] scale-y-[-1] -translate-x-5" />
        </div>
        <Cloud className="absolute w-9/10 bottom-0 right-0 w-7/10 lg:w-3/10" />
        <Wrapper toggle={toggle}/>
      </aside>
    </sidebarContext.Provider>
  )
}

export default Sidebar
