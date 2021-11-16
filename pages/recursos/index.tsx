import { PageWithLayout } from '@/components/page'
import Hero from '@www/recursos/hero'

const Nosotras: PageWithLayout = () => {
  return (
    <div className="bg-white">
      <Hero />
    </div>
  )
}

Nosotras.getLayoutProps = (() => ({
  title: 'Recursos',
}))

export default Nosotras
