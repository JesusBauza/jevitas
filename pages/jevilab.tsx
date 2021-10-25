import { PageWithLayout } from '@/components/page'
import Content from '@www/jevilab/content'
import Hero from '@www/jevilab/hero'

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
