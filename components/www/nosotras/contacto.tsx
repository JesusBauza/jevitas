import Wave from "@/components/wave"
import Heart from './svg/heart2.svg'
import Eye from './svg/eye.svg'
import Shapes from './svg/shapes.svg'
import Couch from './svg/couch.svg'
import Full from './svg/contacto.svg'

const links = [
  {
    title: 'Email',
    text: 'jevitasintensas@gmail.com',
    href: 'mailto:jevitasintensas@gmail.com'
  },
  {
    title: 'Facebook',
    text: 'jevitasintensas',
    href: 'https://facebook.com/jevitasintensas'
  },
  {
    title: 'Instagram',
    text: '@jevitasintensas',
    href: 'https://instagram.com/jevitasintensas'
  },
  {
    title: 'Twitter',
    text: '@jevitasintensas',
    href: 'https://twitter.com/jevitasintensas'
  },
  {
    title: 'WhatsApp',
    text: 'wa.link/yuyqis',
    href: 'https://wa.link/yuyqis'
  },
  {
    title: 'Podcast',
    text: 'anchor.fm/jevitasintensas',
    href: 'https:/anchor.fm/jevitasintensas'
  },
]

const Contacto = () => (
  <>
    <Wave color="#d98c24" className="bg-white" />
    <div className="w-full bg-[#d98c24] flex flex-col items-center relative">
      <Eye className="absolute right-0 hidden lg:block w-2/10 h-auto" />
      <Shapes className="absolute right-0 bottom-0 hidden lg:block w-2/10 h-auto" />
      <Couch className="absolute left-0 bottom-0 hidden lg:block w-2/10 h-auto" />
      <div className="relative py-16">
        <Heart className="absolute transform translate-y-[-25%] translate-x-[-50%]" />
        <h3 className="font-title text-white text-4xl sm:text-5xl relative">Conversemos</h3>
      </div>
      <div className="lg:w-5/10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 my-16">
        {links.map((l, idx) => (
          <div className="flex flex-col space-y-4 font-title" key={idx}>
            <h5 className="text-2xl sm:text-2xl text-[#fdd2a7]">{l.title}:</h5>
            <a href={l.href} className="text-white text-2xl sm:text-2xl hover:underline">{l.text}</a>
          </div>
        ))}
      </div>
      <Full className="w-full sm:hidden" />
    </div>
    <Wave color="#d98c24" className="bg-[#fdd2a7] transform rotate-180" />
  </>
)

export default Contacto
