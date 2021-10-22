import { PageWithLayout } from '@/components/page'
import Acompa from '@www/home/acompa'
import Banner from '@www/home/banner'
import Banner2 from '@www/home/banner2'
import Hero from '@www/home/hero'
import Podcast from '@www/home/podcast'
import Tiendita from '@www/home/tiendita'
import Welcome from '@www/home/welcome'

const Index: PageWithLayout = () => {
  return (
    <>
      <Hero />
      <Welcome />
      <Tiendita />
      <Banner />
      <Acompa />
      <Banner2 />
      <Podcast />
    </>
  )
}

export default Index
