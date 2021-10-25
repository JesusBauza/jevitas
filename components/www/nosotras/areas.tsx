import Wave from '@/components/wave'
import Somos from './svg/somos.svg'
import Sentimos from './svg/sentimos.svg'
import Hacemos from './svg/hacemos.svg'
import Viewport, { setAnim } from '@/components/viewport'

const content = () => [
  {
    image: <Somos className="w-full lg:w-auto lg:h-[262px]" />,
    title: 'Somos',
    text: 'Identidad espiritual',
  },
  {
    image: <Sentimos className="w-full lg:w-auto lg:h-[262px]" />,
    title: 'Sentimos',
    text: 'Pensamientos y emociones',
  },
  {
    image: <Hacemos className="w-full lg:w-auto lg:h-[262px]" />,
    title: 'Hacemos',
    text: 'Talentos e ideas',
  },
]

const Areas = () => {
  return (
    <div className="flex flex-col">
      <Wave className="w-full text-[#F8F3EF]" />
      <div className="bg-[#F8F3EF]">
        <Viewport className="c-lg flex flex-col space-y-16 animate" style={setAnim({ y: '0.5rem' })}>
          <h3 className="font-black text-4xl text-fg-primary">
            Acompáñanos <br className="hidden lg:block" />
            en 3 áreas
          </h3>
          <Viewport className="grid grid-cols-1 lg:grid-cols-3 w-full gap-32 pb-12">
            {content().map((c, idx) => (
              <div className="w-full flex flex-col animate" style={setAnim({ d: ((idx + 1) * 200) + 'ms', y: '0.5rem' })}>
                {c.image}
                <h4 className="font-black text-2xl text-center mt-8 mb-2">
                  {c.title}
                </h4>
                <p className="text-fg-primary font-bold text-xl text-center">{c.text}</p>
              </div>
            ))}
          </Viewport>
        </Viewport>
      </div>
    </div>
  )
}

export default Areas
