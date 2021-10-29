import { PageWithLayout } from '@/components/page'
import Content from '@www/programas/content'

const JeviLab: PageWithLayout = () => {
  return (
    <div className="bg-white overflow-hidden w-full h-full">
      <Content/>
    </div>
  )
}

JeviLab.getLayoutProps = (() => ({
  title: 'Programas',
}))

export default JeviLab
