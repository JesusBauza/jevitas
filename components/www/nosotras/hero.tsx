import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import lottieData from './lottie/hero.json'
import Lottie from 'react-lottie'
import Dots from './svg/herodots.svg'

const Hero = () => {
  const sH = use100vh()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="relative">
      <Dots className="absolute hidden sm:block" />
      <Viewport
        className="flex flex-col pt-8 pb-4 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)] relative z-10"
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
        <div className="flex w-full animate pt-8 lg:pt-0 lg:w-1/2 justify-center relative lottie" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
          <style jsx>{`
          .lottie :global(svg) {
            overflow: visible;
          }
          `}</style>
          <Lottie options={defaultOptions} style={{ overflow: 'visible', width: '90%' }} />
        </div>
      </Viewport>
    </div>
  )
}

export default Hero
