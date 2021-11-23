import CanonicalLink from '@/components/canonical-link'
import LogoSVG from '@/public/images/logo.svg'

const links = [
  {
    titulo: 'Formaciones',
    href: '/programas',
  },
  {
    titulo: 'Nuestra tiendita',
    href: '/tiendita',
  },
  {
    titulo: 'Laboratorio de ideas',
    href: '/jevilab',
  },
  {
    titulo: 'De intensidades y dudas',
    href: 'https://anchor.fm/jevitasintensas',
  },
  {
    titulo: 'Recursos',
    href: '/recursos',
  },
  {
    titulo: 'Blog',
    href: '/blog',
  },
  {
    titulo: 'Nosotras',
    href: '/nosotras',
  },
  {
    titulo: 'Comunidad de expertas',
    href: '/citas',
  },
]

const Footer = () => (
  <footer className="w-full bg-[#FDD2A7] py-24 flex flex-col space-y-16 lg: space-y-10">
    <div className="c-lg flex flex-col lg:flex-row items-center">
      <div className="w-full items-center flex lg:items-start flex-col space-y-8">
        <LogoSVG className="w-1/2" />
        <p className="text-sm font-bold text-fg-primary hidden lg:block">Made By Marketing Shakers</p>
      </div>
      <div className="w-full justify-center grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-4 gap-4 mt-16 lg:mt-0 font-bold">
        {links.map((l, idx) => (
          <CanonicalLink href={l.href} key={idx} className="uppercase hover:underline text-sm text-fg-primary">{l.titulo}</CanonicalLink>
        ))}
      </div>
    </div>
    <div className="c-lg lg:hidden">
        <p className="text-sm font-bold">Made By Marketing Shakers</p>
    </div>
  </footer>
)

export default Footer
