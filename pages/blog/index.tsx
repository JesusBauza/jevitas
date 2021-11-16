import { PageWithLayout } from '@/components/page'
import Hero from '@www/blog/hero'

const Nosotras: PageWithLayout = () => {
  return (
    <div className="bg-white">
      <Hero />
    </div>
  )
}

Nosotras.getLayoutProps = (() => ({
  title: 'Nuestro blog',
}))

export default Nosotras
