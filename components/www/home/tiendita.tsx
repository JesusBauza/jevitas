import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import { Image } from 'caravaggio-react'

const sample = {
  image: '/images/image1.png',
  title: 'T-Shirt Jevi',
  price: 20,
}

const Tiendita = () => {
  const sH = use100vh()
  return (
    <>
      <div className="bg-[#FDD2A7] w-full relative">
        <Viewport
          className="flex flex-col justify-center items-center space-y-16 min-h-[var(--min-h)] c-lg py-16"
          style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 97px)`, perspective: 1000 }}
        >
          <div className="flex flex-col space-y-8 w-full text-center" style={setAnim({ y: '0.5rem' })}>
            <h3 className="animate text-3xl xl:text-5xl font-title text-fg-secondary">
              Nuestra tiendita
            </h3>
            <p className="animate" style={setAnim({ d: '100ms' })}>
              Nuestra línea de mercancía está pensada para <br className="hidden sm:block" />
              despertar el espíritu creativo de mujeres.
            </p>
          </div>
          <Viewport className="grid lg:grid-cols-3 w-full gap-16 sm:gap-32" style={setAnim({ y: '0.5rem' })}>
            {Array.from({ length: 3 }, () => sample).map((p, idx) => (
              <div className="flex flex-col space-y-4 animate" style={setAnim({ d: `${400 + (100 * idx)}ms` })} key={idx}>
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    className="w-full"
                    loading="lazy"
                    width={282}
                    height={292}
                    opt={{
                      progressive: true,
                      q: 90,
                      o: 'webp',
                      rs: {
                        s: '282x292',
                      },
                    }}
                  />
                </div>
                <div className="flex w-full justify-between">
                  <h4 className="font-title text-2xl">{p.title}</h4>
                  <p className="text-2xl">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </Viewport>
        </Viewport>
      </div>
    </>
  )
}

export default Tiendita
