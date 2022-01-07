import Contacto from '@/components/contacto'
import { PageWithLayout } from '@/components/page'

const JeviLab: PageWithLayout = () => {
  return (
    <Contacto />
  )
}

JeviLab.getLayoutProps = (() => ({
  title: 'Contacto',
  navbarColor: '#f0be69',
}))

export default JeviLab
