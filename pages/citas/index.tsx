import { PageWithLayout } from '@/components/page'
import Content from '@www/citas/content'
import Hero from '@www/citas/hero'

const JeviLab: PageWithLayout = () => {
  return (
    <div className="bg-white overflow-hidden">
      <Hero />
      <Content />
    </div>
  )
}

JeviLab.getLayoutProps = (() => ({
  title: 'JeviLab',
}))

export default JeviLab
