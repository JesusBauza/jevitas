import Viewport, { setAnim } from '@/components/viewport'
import Bg from '@/public/images/banner.png'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className="bg-[#f0be69] py-24 relative">
      <Image className="absolute w-full h-full object-cover select-none pointer-events-none" layout="fill" src={Bg} quality={100} />
      <Viewport
        className="animate text-center c-lg flex justify-center items-center"
        style={{ perspective: 1000, ...setAnim({ y: '0.5rem' }) }}
        oneWay
      >
        <style jsx>{`
        .underlined {
          position: relative;
        }
        .underlined::before {
          width: calc(100% + 0.6rem);
          z-index: -1;
          height: 25%;
          background: #f4d9ae;
          position: absolute;
          content: "";
          left: -0.3rem;
          bottom: 0.3rem;
        }
        `}</style>
        <h2 className="font-title text-2xl sm:text-5xl w-full lg:w-1/2 text-[#f8f3ef]">
          Elegimos el bienestar, <br />
          un corazón contento y <br />
          <span className="text-fg-secondary underlined">una dosis de intensidad</span>
        </h2>
      </Viewport>
    </div>
  )
}

export default Banner
