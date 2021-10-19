import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import Img from './banner2.svg'
import Fig1 from './banner2-fig1.svg'
import Fig2 from './banner2-fig2.svg'
import Image from 'next/image'

const Banner2 = () => {
  return (
    <>
      <div className="bg-[#d98c24] w-full overflow-hidden relative">
        <div className="absolute flex w-full h-full items-center">
          <Fig1 />
        </div>
        <div className="absolute flex w-full h-full items-center justify-end">
          <Fig2 />
        </div>
        <Viewport
          className="flex flex-col c-lg items-center lg:flex-row lg:space-x-16 lg:py-0"
          style={{ perspective: 1000 }}
        >
          <div className="flex flex-col space-y-8 w-full lg:w-2/3 py-8" style={setAnim({ y: '0.5rem' })}>
            <h1 className="animate text-3xl xl:text-5xl font-title text-white">
              Acompáñanos en el detrás <br />
              de escenas de Jevitas Intensas
            </h1>
            <div className="animate" style={setAnim({ d: '100ms', y: '0.5rem' })}>
              <Button href="/contacto" type="vintage" title="Únete a la comunidad" className="uppercase mr-auto" />
            </div>
          </div>
          <div className="flex w-full pt-16 animate lg:py-0 lg:w-1/3 justify-center items-end" style={setAnim({ d: '400ms', y: '0.5rem' })}>
            <Img className="w-full pt-8 -mb-10 lg:-mb-4" />
          </div>
        </Viewport>
      </div>
    </>
  )
}

export default Banner2
