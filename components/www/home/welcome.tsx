import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Annella from '@/public/images/annella.png'
import Image from 'next/image'
import Hearts from './hearts.svg'

const Welcome = () => {
  const sH = use100vh()
  return (
    <>
      <div className="bg-[#f8f3ef] w-full relative">
        <Hearts className="absolute top-[2%] left-[-1%]" />
        <Viewport
          className="flex flex-col py-8 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)]"
          style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 97px)`, perspective: 1000 }}
        >
          <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '0.5rem' })}>
            <h1 className="animate text-3xl xl:text-5xl font-title text-fg-secondary">
              Hola! Soy Annella,
            </h1>
            <div className="space-y-6">
              <p className="animate" style={setAnim({ d: '100ms' })}>
                Y estoy detrás de Jevitas Intensas pensando, <br className="hidden sm:block" />
                creando, diseñando, haciendo. Soy periodista y <br className="hidden sm:block" />
                tengo 6 años creando contenidos en internet y <br className="hidden sm:block" />
                siendo directora creativa de agencias, marcas, <br className="hidden sm:block" />
                pequeñas y medianas empresas.
              </p>
              <p className="animate font-bold" style={setAnim({ d: '200ms' })}>
                Pienso que la vida es una peli y por eso escribo. <br className="hidden sm:block" />
                Cristo en mí y yo en mejora continua.
              </p>
            </div>
          </div>
          <div className="flex w-full pb-8 pt-16 animate lg:py-0 lg:w-1/2 justify-center" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
            <Image src={Annella} placeholder="blur" quality={100} />
          </div>
        </Viewport>
      </div>
    </>
  )
}

export default Welcome
