import { PageWithLayout } from '@/components/page'
import Content from '@www/jevilab/content'
import Hero from '@www/jevilab/hero'

const Index: PageWithLayout = () => {
  return (
    <div className="bg-white overflow-hidden">
      <Hero />
      <Content />
    </div>
  )
}

Index.getLayoutProps = (() => ({
  title: 'JeviLab',
}))

export default Index
