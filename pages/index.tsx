import { PageWithLayout } from '@/components/page'
import Banner from '@www/home/banner'
import Banner2 from '@www/home/banner2'
import Hero from '@www/home/hero'
import Welcome from '@www/home/welcome'

const Index: PageWithLayout = () => {
  return (
    <>
      <Hero />
      <Welcome />
      <Banner />
      <Banner2 />
    </>
  )
}

export default Index
