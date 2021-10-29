import Parallax from '@/components/parallax'
import Wave from '@/components/wave'
import Branding from './svg/branding.svg'
import Ideas from './svg/ideas.svg'
import Contenido from './svg/contenido.svg'
import Fotografiamos from './svg/fotografiamos.svg'
import Consultorias from './svg/consultoria.svg'
import Web from './svg/web.svg'
import Banner from './svg/banner.svg'
import s from './content.module.css'
import Viewport, { setAnim } from '@/components/viewport'

const content = () => [
  {
    image: <Branding className="w-full h-auto" />,
    title: 'Branding',
    text: 'Todas las ideas que tienes en mente, las convertimos en piezas gráficas, desde lo más grande, hasta lo más pequeño.',
  },
  {
    image: <Ideas className="w-full h-auto" />,
    title: 'Pensando ideas para tu negocio',
    text: 'Te ayudamos a generar ideas constantemente para que tu negocio siempre tenga algo nuevo que sorprenda.',
  },
  {
    image: <Contenido className="w-full h-auto" />,
    title: 'Creamos contenido',
    text: 'Nos encargamos de que tu marca tenga voz y algo importante que decir para conectar con otros.',
  },
  {
    image: <Fotografiamos className="w-full h-auto" />,
    title: 'Fotografiamos tus servicios y productos',
    text: 'Lo que haces necesita ser mostrado, y nosotros tenemos buen ojo para eso.'
  },
  {
    image: <Consultorias className="w-full h-auto" />,
    title: 'Brindamos consultorias',
    text: 'Te acompañamos a dar tus primeros pasos como negocio y a convertir tus ideas en una realidad que pueda comunicarse y venderse.',
  },
  {
    image: <Web className="w-full h-auto" />,
    title: 'Desarrollamos páginas web',
    text: 'Tu marca necesita su propio espacio en internet, nosotros lo diseñamos estratégicamente para ti.',
  },
]

const Content = () => (
  <div className="relative w-full">
    <Parallax className="absolute w-full h-[150%] flex flex-col mt-[-37vh]" negative>
      <Wave className="w-full text-[#F0AD9D]" />
      <div className="bg-[#F0AD9D] h-[40%] w-full relative">
        <Wave className="w-full absolute bottom-0 text-[#C4D7D1]" />
      </div>
      <div className="bg-[#C4D7D1] h-[60%] w-full relative" />
    </Parallax>
    <div className={`py-24 c-lg grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-y-32 lg:gap-x-64 relative grid-flow-row-dense lg:py-64 ${s.contents}`}>
      {content().map((c, idx) => (
        <Viewport className={`flex flex-col w-full space-y-6 ${idx % 2 != 0 ? 'lg:mt-48' : 'lg:-mt-48'} animate`} style={setAnim({ d: '400ms', y: '1rem', time: '800ms' })} oneWay key={idx}>
          {c.image}
          <h3 className="font-black text-3xl lg:w-8/10">{c.title}</h3>
          <p className="font-bold text-white lg:w-8/10">{c.text}</p>
        </Viewport>
      ))}
    </div>
    <div className="c-lg py-24 relative">
      <Viewport
        className="flex flex-col space-y-8 items-center text-center bg-[#F8F3EF] px-12 pb-12 lg:px-16 lg:pb-16 rounded-[40px] animate"
        style={{ perspective: 1000, ...setAnim({ y: '2rem', rx: '32deg' }) }}
      >
        <Banner className="-mt-4 animate" style={setAnim({ d: '200ms' })} />
        <h3 className="text-2xl lg:text-5xl font-title text-[#4E4C4D] animate" style={setAnim({ d: '400ms' })}>
          Nos encargamos de eso para <br className="hidden lg:block" />
          lo que no tienes tiempo
        </h3>
      </Viewport>
    </div>
    <div className="c-lg py-24 relative">
      <Viewport
        className="flex flex-col space-y-8 items-center text-center bg-[#F8F3EF] px-12 pb-12 lg:px-16 lg:pb-16 rounded-[40px] animate"
        style={{ perspective: 1000, ...setAnim({ y: '2rem', rx: '32deg' }) }}
      >
        <Banner className="-mt-4 animate" style={setAnim({ d: '200ms' })} />
        <h3 className="text-2xl lg:text-5xl font-title text-[#4E4C4D] animate" style={setAnim({ d: '400ms' })}>
          Nos encargamos de eso para <br className="hidden lg:block" />
          lo que no tienes tiempo
        </h3>
      </Viewport>
    </div>
  </div >
)
export default Content
