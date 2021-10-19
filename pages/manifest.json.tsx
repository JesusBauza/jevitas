import type { GetServerSideProps } from 'next'
import { getDefaultBrandLayout } from '@/models/page/brand-layout'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const layout = getDefaultBrandLayout()
  const imageBuilder = (s: number) => `/api/caravaggio/o:png/progressive:true/rs,s:${s}x${s},g:center?image=${encodeURIComponent(layout.icon)}`
  const iconsRes = [36, 48, 72, 96, 144, 192, 256, 384, 512]
  if (res) {
    res.setHeader('content-type', 'application/json')
    res.write(JSON.stringify({
      name: layout.titleName,
      short_name: layout.titleName,
      description: layout.titleName,
      dir: 'auto',
      lang: 'en-US',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      background_color: layout.themes.normal.background.primary,
      theme_color: layout.themes.normal.background.primary,
      icons: iconsRes.map(s => ({
        src: imageBuilder(s),
        sizes: `${s}x${s}`,
        type: 'image/png',
      }))
    }))
    res.end()
  }

  return {
    props: {},
  }
}

const ManifestPage = () => null

export default ManifestPage
