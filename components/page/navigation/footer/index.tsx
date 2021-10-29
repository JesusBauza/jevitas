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
]

const Footer = () => (
  <footer className="w-full bg-[#FDD2A7] py-24">
    <div className="c-lg flex flex-col lg:flex-row items-center">
      <div className="w-full justify-center flex lg:justify-start">
        <LogoSVG className="w-1/2" />
      </div>
      <div className="w-full justify-center flex flex-col space-y-4 mt-16 lg:mt-0">
        {links.map((l, idx) => (
          <CanonicalLink href={l.href} key={idx} className="uppercase hover:underline text-sm text-fg-primary">{l.titulo}</CanonicalLink>
        ))}
      </div>
    </div>
  </footer>
)

export default Footer
