import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import HeroSVG from './svg/hero.svg'

const Hero = () => {
  const sH = use100vh()
  return (
    <div className="bg-[#C4D7D1]">
      <Viewport
        className="flex flex-col pt-8 pb-4 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)] relative z-10"
        style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 84px)` }}
      >
        <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '1rem' })}>
          <h1 className="animate  text-5xl xl:text-6xl font-title text-white">
            Recupera tu <br />
            bienestar emocional
          </h1>
          <p className="animate font-bold" style={setAnim({ d: '100ms' })}>
            Empieza a cambiar tu vida hoy, habla de forma <br className="hidden sm:block" />
            segura y privada con un psicólogo online <br className="hidden sm:block" />
            cuando lo necesites
          </p>
          <div className="animate font-bold" style={setAnim({ d: '200ms' })}>
            <Button title="Inicia ahora" href="/citas/reservar" type="orange" />
          </div>
        </div>
        <div className="flex w-full animate lg:w-1/2 justify-center relative" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
          <HeroSVG className="h-auto py-16" />
        </div>
      </Viewport>
    </div>
  )
}

export default Hero
