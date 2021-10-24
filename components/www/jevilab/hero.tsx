import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Annella from '@/public/images/welcome.png'
import Image from 'next/image'
import HeroSVG from './svg/hero.svg'
import Wave from '@/components/wave'

const Hero = () => {
  const sH = use100vh()
  return (
    <Viewport
      className="flex flex-col pt-8 pb-4 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)] relative z-10"
      style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 84px)` }}
    >
      <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '1rem' })}>
        <h1 className="animate text-5xl font-title text-[#F0AD9D]">
          Inyectamos una <br />
          dosis de creatividad <br />
          e inspiracion
        </h1>
        <p className="animate font-bold" style={setAnim({ d: '100ms' })}>
          Pensamos, creamos y diseñamos ideas para nuestros <br className="hidden sm:block" />
          clientes, inyectando una dosis de creatividad e inspiración <br className="hidden sm:block" />
          para que sus pequeñas y medianas empresas puedan <br className="hidden sm:block" />
          ocupar un espacio dentro del ecosistema digital.
        </p>
        <div className="animate font-bold" style={setAnim({ d: '200ms' })}>
          <Button title="Conoce nuestros servicios" href="/contacto" type="pink" />
        </div>
      </div>
      <div className="flex w-full animate lg:w-1/2 justify-center relative" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
        <HeroSVG className="h-auto py-16" />
      </div>
    </Viewport>
  )
}

export default Hero
