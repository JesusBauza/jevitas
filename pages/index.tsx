import { PageWithLayout } from '@/components/page'
import { datoCMSFetcher } from '@/lib/fetcher'
import Acompa from '@www/home/acompa'
import Banner from '@www/home/banner'
import Banner2 from '@www/home/banner2'
import Hero from '@www/home/hero'
import Podcast from '@www/home/podcast'
import Tiendita from '@www/home/tiendita'
import Welcome from '@www/home/welcome'
import { GetStaticProps } from 'next'
import { createContext, useContext } from 'react'

export type HomeData = {
  hero: {
    title: string
    subtitle: string
    text: string
  }
  welcome: {
    title: string
    text: string
  }
  banners: {
    bannerA: string
    bannerB: string
    bannerBLink: string
  }
  podcast: {
    title: string
    text: string
  }
}

export const getStaticProps: GetStaticProps<HomeData> = async (context: any) => {
  let props: HomeData
  try {
    props = await datoCMSFetcher(`{
      hero: home {
        title: heroTitle
        subtitle: heroSubtitle
        text: heroText
      }
      welcome: home {
        title: welcomeTitle
        text: welcomeText
      }
      banners: home {
        bannerA
        bannerB
        bannerBLink
      }
      podcast: home {
        title: podcastTitle
        text: podcastText
      }
    }`)
  } catch (err) {
    console.error(err)
  }
  return {
    props,
    revalidate: 1,
  }
}

export const homeContext = createContext<HomeData>(null)
export const useHomeData = () => useContext(homeContext)

const Index: PageWithLayout<HomeData> = (props) => {
  return (
    <homeContext.Provider value={props}>
      <Hero />
      <Welcome />
      <Tiendita />
      <Banner />
      <Acompa />
      <Banner2 />
      <Podcast />
    </homeContext.Provider>
  )
}

export default Index
