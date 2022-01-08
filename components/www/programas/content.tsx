import Ideas from './svg/ideas.svg'
import Misma from './svg/misma.svg'
import Retos from './svg/retos.svg'
import Camp from './svg/camp.svg'
import Sol from './svg/sol.svg'
import s from './content.module.css'
import Viewport, { setAnim } from '@/components/viewport'
import { Button } from '@/components/button'
import { useProgramsData } from '@/pages/programas'
import dynamic from 'next/dynamic'

const ReactTypingEffect: any = dynamic(
  () => import('react-typing-effect'),
  { ssr: false }
)

const items = () => [
  {
    img: <Ideas className="w-full h-auto" />,
    title: 'Aterriza tus ideas',
    text: 'Programa especializado para que mujeres emprendedoras logren aterrizar sus ideas y montarlas en un modelo de negocio',
    key: 'ideas',
  },
  {
    img: <Misma className="w-full h-auto" />,
    title: 'Be you misma',
    text: 'El programa de descubrimiento inicial de Jevitas Intensas del que hasta ahora han sido parte cientos de mujeres hispanas ',
    key: 'beYouMisma',
  },
  {
    img: <Retos className="w-full h-auto" />,
    title: 'Jeviretos: 5 días de transformación.',
    text: 'Retos diarios para potenciar nuevos hábitos en grupo.',
    key: 'jeviretos',
  },
  {
    img: <Camp className="w-full h-auto" />,
    title: 'Summer Camp',
    text: '¡12 días de bienestar, corazones contentos y una dosis de intensidad para aprender haciendo!',
    key: 'jevicamp',
  },
]

const Content = () => {
  const data = useProgramsData()
  return (
    <div className="flex-col space-y-24 pt-16 pb-24">
      {items().map((i, idx) => (
        <div className="lg:px-[1.5rem] mx-auto w-full lg:w-[90%] flex items-center lg:min-h-[var(--min-h)]" style={{ ['--min-h' as string]: 'calc(80vh - 83px)' }} key={idx}>
          <Viewport
            className={`grid grid-cols-1 w-full lg:grid-cols-2 items-center gap-8 lg:gap-24 ${idx % 2 !== 0 ? s.reverse : ''}`}
            style={{ ...setAnim({ d: '200ms', y: '1rem', time: '800ms' }) }}
            oneWay
          >
            <div className="animate w-full">
              {i.img}
            </div>
            <div className="flex flex-col space-y-6 animate px-[1.5rem] lg:px-0" style={setAnim({ d: '400ms' })}>
              <h3 className="font-title text-fg-primary text-3xl lg:text-5xl">{i.title}</h3>
              <p className="font-bold text-[#C4D7D1] lg:w-[60%]">{i.text}</p>
              <Button title="Conocer" type="green" className="self-start" href={data[i.key]} />
            </div>
          </Viewport>
        </div>
      ))}
      <Viewport
        className="c-lg relative"
        style={{ perspective: 1000, ...setAnim({ y: '2rem', rx: '32deg' }) }}
        oneWay
      >
        <h3 className="font-title text-fg-primary text-3xl lg:text-5xl text-center text-[#C4D7D1] mb-12 animate">
          Nuestra comunidad <br className="hidden lg:block" />
          habla por nosotras
        </h3>
        <div
          className="flex flex-col space-y-6 items-center text-center bg-[#F0AD9D] p-8 lg:p-12 lg:pt-6 rounded-[40px] animate"
          style={setAnim({ d: '200ms' })}
        >
        <ReactTypingEffect
          speed={20}
          eraseSpeed={10}
          text={data.testimonios.map(t => t.testimonio)}
          cursor=" "
          cursorClassName="h"
          typingDelay={0}
          displayTextRenderer={(text, idx) => {
            return (
              <div
                className="flex flex-col space-y-6 items-center"
                style={setAnim({ d: '200ms' })}
              >
                <Sol className="animate" style={setAnim({ d: '400ms' })} />
                <p className="text-lg lg:text-xl lg:w-[80%] font-title text-[#4E4C4D] animate" style={setAnim({ d: '600ms' })}>
                  {text.split('').map((char, i) => {
                    const key = `${i}`;
                    return (
                      <span
                        key={key}
                      >{char}</span>
                    );
                  })}
                </p>
                <p className="text-sm lg:text-base text-white font-title animate" style={setAnim({ d: '700ms' })}>
                  {data.testimonios[idx].autor}
                </p>
              </div>
            );
          }}
        />
        </div>
      </Viewport >
    </div >
  )
}

export default Content
