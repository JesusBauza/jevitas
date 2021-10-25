import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Waves from './svg/waves.svg'
import Image from './svg/hero2.svg'

const Hero2 = () => {
  const sH = use100vh()

  return (
    <div className="relative">
      <Waves className="absolute right-0 bottom-0" />
      <Viewport
        className="flex flex-col pt-8 pb-4 c-lg items-center lg:flex-row-reverse lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)] relative z-10"
        style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 84px)` }}
      >
        <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '1rem' })}>
          <h1 className="animate text-2xl lg:text-4xl font-title">
            En Jevitas Intensas somos una <br className="hidden lg:block" />
            comunidad que acompaña a mujeres <br className="hidden lg:block" />
            hispanas a descubrir su propósito de <br className="hidden lg:block" />
            vida, emprender online y a ocupar <br className="hidden lg:block" />
            espacios con sus ideas.
          </h1>
        </div>
        <div className="flex w-full animate pt-8 lg:pt-0 lg:w-1/2 relative lottie" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
          <Image className="w-full lg:w-8/10 h-auto" />
        </div>
      </Viewport>
    </div>
  )
}

export default Hero2
