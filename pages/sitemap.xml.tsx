import { getAbsoluteURL } from '@/lib/utils/client'
import { GetServerSideProps } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'

type BuildSitemap = (items: any, host: string) => Promise<any>

const pages = ['', '/jevilab', '/nosotras', '/blog', '/tiendita']

const buildSitemap: BuildSitemap = (items, host: string) => {
  const sitemap = new SitemapStream({
    hostname: getAbsoluteURL(),
  })

  pages.forEach((path) => {
    sitemap.write({
      url: getAbsoluteURL({ path, host }),
      lastmodISO: new Date().toISOString(),
      priority: path === '' ? 1 : 0.7,
    })
  })

  sitemap.end();

  return streamToPromise(sitemap)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (res) {
    const sitemap = await buildSitemap({}, req.headers.host)

    res.setHeader('content-type', 'text/xml')
    res.write(sitemap.toString())
    res.end()
  }

  return {
    props: {},
  }
}

const SitemapPage = () => null

export default SitemapPage
