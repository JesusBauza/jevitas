import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Annella from '@/public/images/welcome.png'
import Flower from './svg/flor.svg'
import Fig1 from './svg/hero-fig1.svg'
import Fig2 from './svg/hero-fig2.svg'
import Cloud from './svg/nube.svg'
import Gotas from './svg/gotas.svg'
import Eye from './svg/ojo.svg'
import Image from 'next/image'
import { useHomeData } from '@/pages'
import { useContact } from '@/components/page'

const Hero = () => {
  const sH = use100vh()
  const { hero } = useHomeData()
  const [_, setOpen] = useContact()
  return (
    <>
      <Viewport className="relative overflow-hidden" style={{ perspective: 1000, backgroundColor: hero.colorBg?.hex || 'unset' }}>
        <Flower className="absolute z-[1] w-6/10 lg:w-auto bottom-[16%] lg:bottom-[20%] animate" style={setAnim({ d: '600ms', y: '0.5rem', x: '-0.5rem' })} />
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
            <Image src={Annella} placeholder="blur" quality={100} />
          </div>
          <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '1rem' })}>
            <h1
              className="animate text-5xl xl:text-7xl font-title"
              dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }}
              style={{ color: hero.colorTitle?.hex || 'rgb(var(--brand-fg-primary))' }}
            />
            <p
              className="animate font-bold"
              style={{ ...setAnim({ d: '100ms' }), color: hero.colorText?.hex || 'unset' }}
              dangerouslySetInnerHTML={{ __html: hero?.subtitle?.replace(/\n/g, '<br/>') }}
            />
            <div className="animate font-bold" style={setAnim({ d: '200ms' })}>
              <Button title="Conócenos" onClick={() => setOpen(true) } />
            </div>
          </div>
        </Viewport>
        <Viewport
          className="mt-14 lg:mt-24 mb-16 animate text-center c-lg flex justify-center items-center"
          style={{ perspective: 1000, ...setAnim({ y: '0.5rem' }) }}
          oneWay
        >
          <h2
            className="font-title text-xl w-full lg:w-1/2"
            style={{ color: hero.colorTitle?.hex || 'rgb(var(--brand-fg-primary))' }}
            dangerouslySetInnerHTML={{ __html: hero?.text?.replace(/\n/g, '<br/>') }}
          />
        </Viewport>
      </Viewport>
    </>
  )
}

export default Hero
