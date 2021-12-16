import { ReactNode, useContext, createContext, useEffect, useMemo, useState } from 'react'
import { Navbar, Footer } from './navigation'
import OgImage, { OgImageProps } from './og-image'
import SeoTags, { SeoTagsProps } from './seo-tags'
import { GoogleFonts } from '@/components/google-fonts'
import Favicons from './favicons'
import { NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { IBrandLayout, getDefaultBrandLayout } from '@/models/page/brand-layout'
import NextNprogress from 'nextjs-progressbar'
import { BrandLayoutProvider, useBrandLayout } from '@/models/page/brand-layout/context'
import { hexToRgb } from '@/models/common/color'
import { DarkModeProvider, useDarkMode } from '@/lib/dark-mode'
import { getAbsoluteURL } from '@/lib/utils/client'

export type GetLayoutProps<T = PageProps> = (props: T) => PageProps

export type PageWithLayout<T = PageProps> = NextPage<T> & {
  getLayoutProps?: GetLayoutProps<T>
}

export const pageContext = createContext<OgImageProps & SeoTagsProps>(null)
export const usePageProps = () => useContext(pageContext)

export interface PageProps extends OgImageProps, SeoTagsProps {
  useLayout?: boolean
  canonical?: boolean
  pageLayout?: IBrandLayout
  smoothScroll?: boolean
  navbar?: boolean
  footer?: boolean
  globalData?: any
  host?: string
  navbarColor?: string
  children?: ReactNode
}

export const globalDataContext = createContext<any>(null)
export const useGlobalDataContext = () => useContext(globalDataContext)

export const useTheme = (brandLayout?: IBrandLayout) => {
  const [layout] = useBrandLayout()
  const [darkMode] = useDarkMode()
  const [theme, setTheme] = useState(() => (brandLayout || layout).themes.normal)
  useEffect(() => {
    setTheme(layout.themes[darkMode ? 'dark' : 'normal'])
  }, [layout, darkMode])
  return theme
}


export const useFonts = (brandLayout?: IBrandLayout) => {
  const [layout] = useBrandLayout()
  const fonts = useMemo(() => (brandLayout || layout).fonts || getDefaultBrandLayout().fonts, [layout, brandLayout])
  return fonts
}

export const PageColors = ({ brandLayout, children }: { brandLayout?: IBrandLayout, children?: ReactNode }) => {
  const theme = useTheme(brandLayout)

  const colors = useMemo(() => ({
    fg: {
      primary: hexToRgb(theme.foreground.primary),
      secondary: hexToRgb(theme.foreground.secondary),
    },
    bg: {
      primary: hexToRgb(theme.background.primary),
      secondary: hexToRgb(theme.background.secondary),
    },
  }), [theme])

  const fonts = useFonts(brandLayout)

  const filteredFonts = useMemo(() => {
    const tmp = []
    if (fonts) {
      if (fonts?.sans != getDefaultBrandLayout().fonts.sans) {
        tmp.push(fonts.sans)
      }
      if (fonts?.title != getDefaultBrandLayout().fonts.title) {
        tmp.push(fonts.title)
      }
    }
    return tmp
  }, [fonts])
  return (
    <>
      {filteredFonts?.length ? (
        <GoogleFonts
          families={filteredFonts}
          display="swap"
        />
      ) : null}

      <NextNprogress
        color={theme.foreground.primary}
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        options={{
          showSpinner: false,
        }}
      />
      <style jsx>{`
      :global(html) {
        background: ${theme.background.primary} !important;
      }
      :global(::-webkit-scrollbar) {
        width: 14px !important;
      }
      :global(::-webkit-scrollbar-track) {
        background: ${theme.background.primary} !important;
      }
      :global(::-webkit-scrollbar-thumb) {
        border: 3px solid transparent !important;
        border-radius: 100px !important;
        background-clip: content-box !important;
        background-color: rgba(${colors.fg.secondary[0]}, ${colors.fg.secondary[1]}, ${colors.fg.secondary[2]}, 0.4) !important;
      }
      :global(::-webkit-scrollbar-thumb:hover) {
        background-color: rgba(${colors.fg.secondary[0]}, ${colors.fg.secondary[1]}, ${colors.fg.secondary[2]}, 1) !important;
      }
      .page-layout {
        --brand-font-title: ${fonts?.title};
        --brand-font-sans: ${fonts?.sans};

        --brand-fg-primary: ${colors.fg.primary[0]}, ${colors.fg.primary[1]}, ${colors.fg.primary[2]};
        --brand-bg-primary: ${colors.bg.primary[0]}, ${colors.bg.primary[1]}, ${colors.bg.primary[2]};

        --brand-fg-secondary: ${colors.fg.secondary[0]}, ${colors.fg.secondary[1]}, ${colors.fg.secondary[2]};
        --brand-bg-secondary: ${colors.bg.secondary[0]}, ${colors.bg.secondary[1]}, ${colors.bg.secondary[2]};

        background-color: rgb(var(--brand-bg-primary));

        position: relative;
      }
      `}</style>
      <div className="page-layout font-sans text-x-gray-800">
        {children}
      </div>
    </>
  )
}

export const PageLayout = (pageProps: PageProps) => {
  const {
    navbar = true,
    footer = true,
    children,
    canonical,
    brandTitle,
    description,
    globalData,
    navbarColor = '#FFF0E3',
    ...rest
  } = pageProps

  const [layout] = useBrandLayout()

  return (
    <PageColors>
      <SeoTags
        {...rest}
        brandTitle={brandTitle || layout?.titleName}
        description={description || (globalData?.SEODescription || layout?.titleName)}
      />
      <div className="flex flex-col min-h-screen w-full page-layout relative">
        {(navbar) && <Navbar canonical={canonical} navbarColor={navbarColor} />}
        <main
          className="flex-grow flex justify-start items-stretch content-stretch"
        >
          <div className="w-full">
            {children}
          </div>
        </main>
        {footer && <Footer />}
      </div>
    </PageColors>
  )
}

const Page = (pageProps: PageProps) => {
  const {
    useLayout = true,
    pageLayout = getDefaultBrandLayout(),
    navbar = true,
    footer = true,
    smoothScroll = true,
    children,
    globalData,
    canonical,
    image = getAbsoluteURL({
      path: `/api/caravaggio/o:png/q:100/progressive:true/rs,s:1200x630,m:fill,g:auto?image=${encodeURIComponent('/images/welcome.png')}`,
    }),
    ...rest
  } = pageProps

  const { push } = useRouter()

  return (
    <globalDataContext.Provider value={globalData}>
      <DarkModeProvider>
        <BrandLayoutProvider defaultLayout={pageLayout}>
          <OgImage {...rest} image={image} />

          <style global jsx>{`
          html {
            ${smoothScroll ? 'scroll-behavior: smooth;' : ''}
          }
          `}</style>

          <Favicons />

          <PageLayout {...pageProps}>
              {children}
          </PageLayout>
        </BrandLayoutProvider>
      </DarkModeProvider>
    </globalDataContext.Provider>
  )
}

export default Page
