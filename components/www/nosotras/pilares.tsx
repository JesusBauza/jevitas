import Wave from '@/components/wave'
import Autenticidad from './svg/autenticidad.svg'
import Amor from './svg/amor.svg'
import Acompa from './svg/acompa.svg'
import Empatia from './svg/empatia.svg'
import Verdad from './svg/verdad.svg'
import Heart from './svg/heart.svg'
import Hearts from './svg/hearts.svg'
import Viewport, { setAnim } from '@/components/viewport'

const content = () => [
  {
    image: <Autenticidad className="w-full lg:w-auto lg:h-[160px]" />,
    title: 'Autenticidad',
  },
  {
    image: <Amor className="w-full lg:w-auto lg:h-[160px]" />,
    title: 'Amor',
  },
  {
    image: <Acompa className="w-full lg:w-auto lg:h-[160px]" />,
    title: 'Acompañamiento',
  },
  {
    image: <Empatia className="w-full lg:w-auto lg:h-[160px]" />,
    title: 'Empatía',
  },
  {
    image: <Verdad className="w-full lg:w-auto lg:h-[160px]" />,
    title: 'Verdad',
  },
]

const Pilares = () => {
  return (
    <div className="flex flex-col bg-[#F0BE69] relative">
      <Wave className="w-full text-[#F8F3EF] transform rotate-180" />
      <div className="relative">
        <Heart className="absolute" />
        <Hearts className="absolute bottom-0 right-0 hidden sm:block" />
        <Viewport className="c-lg flex flex-col space-y-16 animate" style={setAnim({ y: '0.5rem' })}>
          <h3 className="font-black text-4xl">
            Nuestros pilares
          </h3>
          <Viewport className="grid grid-cols-1 lg:grid-cols-3 w-full gap-32 pb-12">
            {content().map((c, idx) => (
              <div className="w-full flex flex-col animate" style={setAnim({ d: ((idx + 1) * 200) + 'ms', y: '0.5rem' })}>
                {c.image}
                <h4 className="font-black text-2xl text-center mt-8 mb-2 text-[#E8521F]">
                  {c.title}
                </h4>
              </div>
            ))}
          </Viewport>
        </Viewport>
      </div>
    </div>
  )
}

export default Pilares
