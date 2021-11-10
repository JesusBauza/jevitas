import '@/styles/app.css'
import '@/styles/icons.css'

import type { AppProps } from 'next/app'
import { CaravaggioProvider } from 'caravaggio-react'
import Page, { PageProps, PageWithLayout } from '@/components/page'
import { useMemo } from 'react'
import { SWRConfig } from 'swr'
import { serviceFetcher } from '@/lib/fetcher'
import Script from 'next/script'

type Props = AppProps & {
  Component: PageWithLayout
}

const App = ({ Component, pageProps }: Props) => {
  const layoutProps = useMemo<PageProps>(() => Component.getLayoutProps
    ? Component.getLayoutProps(pageProps)
    : pageProps,
    [Component.getLayoutProps, pageProps])
  return (
    <SWRConfig
      value={{
        fetcher: serviceFetcher,
        onError: (err, key) => {
          console.error(`SWR Fetch Error: ${key}`, err, { ...err })
        }
      }}
    >
      <CaravaggioProvider url='/api/caravaggio'>
        <Page {...pageProps} {...layoutProps}>
          <Component {...pageProps} />
        </Page>
      </CaravaggioProvider>
    </SWRConfig>
  )
}

export default App
