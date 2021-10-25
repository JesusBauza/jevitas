import { PageWithLayout } from '@/components/page'
import Areas from '@www/nosotras/areas'
import Hero from '@www/nosotras/hero'
import Hero2 from '@www/nosotras/hero2'
import Pilares from '@www/nosotras/pilares'

const Nosotras: PageWithLayout = () => {
  return (
    <div className="bg-[#FDD2A7] overflow-hidden">
      <Hero />
      <Hero2 />
      <Areas />
      <Pilares />
    </div>
  )
}

Nosotras.getLayoutProps = (() => ({
  title: 'Nosotras',
}))

export default Nosotras
