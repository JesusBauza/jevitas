import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Annella from '@/public/images/welcome.png'
import Flower from './flor.svg'
import Fig1 from './hero-fig1.svg'
import Fig2 from './hero-fig2.svg'
import Cloud from './nube.svg'
import Image from 'next/image'
import Gotas from './gotas.svg'
import Eye from './ojo.svg'

const Hero = () => {
  const sH = use100vh()
  return (
    <>
      <Viewport className="relative overflow-hidden" style={{ perspective: 1000 }}>
        <Flower className="absolute z-[1] w-6/10 lg:w-auto bottom-[12%] lg:bottom-[20%] animate" style={setAnim({ d: '600ms', y: '0.5rem', x: '-0.5rem' })} />
        <Fig1 className="absolute z-[1] w-6/10 hidden xl:block lg:w-auto top-0 animate" style={setAnim({ d: '600ms', y: '-0.5rem', x: '-0.5rem' })} />
        <Eye className="absolute hidden xl:block lg:w-auto top-0 right-0 animate" style={setAnim({ d: '100ms', y: '-0.5rem' })} />
        <div className="absolute flex w-full h-full items-center justify-end animate" style={setAnim({ d: '100ms', x: '0.5rem' })}>
          <Fig2 className="transform -translate-y-16 pb-8 translate-x-5" />
        </div>
        <Cloud className="absolute w-6/10 bottom-0 right-0 w-7/10 lg:w-3/10" />
        <Gotas className="absolute bottom-0" />
        <Viewport
          className="flex flex-col-reverse pt-8 pb-4 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)] relative"
          style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 84px)` }}
        >
          <div className="flex w-full pb-8 pt-16 animate lg:py-0 lg:w-1/2 justify-center relative" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
            <Image src={Annella} placeholder="blur" />
          </div>
          <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '1rem' })}>
            <h1 className="animate text-5xl xl:text-7xl font-title text-fg-primary">
              Bienvenidas<br />a Jevitas Intensas
            </h1>
            <p className="animate font-bold" style={setAnim({ d: '100ms' })}>
              Una comunidad que acompaña a mujeres hispanas a <br />
              descubrir su propósito de vida, emprender online y a ocupar <br />
              espacios con sus ideas.
            </p>
            <div className="animate font-bold" style={setAnim({ d: '200ms' })}>
              <Button title="Conócenos" href="contacto" />
            </div>
          </div>
        </Viewport>
        <Viewport
          className="mt-14 lg:mt-24 mb-16 animate text-center c-lg flex justify-center items-center"
          style={{ perspective: 1000, ...setAnim({ y: '0.5rem' }) }}
          oneWay
        >
          <h2 className="font-title text-fg-primary text-xl w-full lg:w-1/2">
            Nuestra intención es que más mujeres puedan vivir una vida
            creativa, inspirada y con ganas de explorarse a sí mismas para
            transformarse ellas y a su entorno
          </h2>
        </Viewport>
      </Viewport>
    </>
  )
}

export default Hero
