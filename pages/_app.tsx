import '@/styles/app.css'
import '@/styles/icons.css'

import type { AppProps } from 'next/app'
import { CaravaggioProvider } from 'caravaggio-react'
import Page, { PageProps, PageWithLayout } from '@/components/page'
import { useMemo } from 'react'
import { SWRConfig } from 'swr'
import { serviceFetcher } from '@/lib/fetcher'
import Head from 'next/head'

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
      <Head>
        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/0f8816d91eeead9aad437ab72/a2a887194376e91ce041dbb79.js");`,
          }}
        />
      </Head>
      <CaravaggioProvider url='/api/caravaggio'>
        <Page {...pageProps} {...layoutProps}>
          <Component {...pageProps} />
        </Page>
      </CaravaggioProvider>
    </SWRConfig>
  )
}

export default App
