import { PageWithLayout } from '@/components/page'
import Wave from '@/components/wave'
import Areas from '@www/nosotras/areas'
import Cartas from '@www/nosotras/cartas'
import Contacto from '@www/nosotras/contacto'
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
      <Cartas />
      <Contacto />
    </div>
  )
}

Nosotras.getLayoutProps = (() => ({
  title: 'Nosotras',
}))

export default Nosotras
