import Viewport, { setAnim } from '@/components/viewport'
import Image from 'next/image'
import AcompaImg from '@/public/images/acompa 1.png'
import Ideas from '@/public/images/ideas 1.png'
import CanonicalLink from '@/components/canonical-link'

const Arrow = () => (
  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.910034 5.39095H14.1876M14.1876 5.39095L9.67392 0.876953M14.1876 5.39095L9.7322 9.84633" stroke="#E8521F" />
  </svg>
)

const Acompa = () => <div className="space-y-8 lg:space-y-0 bg-white py-16 lg:py-0">
  <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full space-y-8 lg:space-y-0">
    <div className="w-full lg:w-1/2 flex flex-col">
      <Image src={AcompaImg} title="Formaciones y acompañamiento" placeholder="blur" className="w-full rounded-[2rem] lg:rounded-none pointer-events-none select-none" quality={100} />
    </div>
    <div className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-6">
      <h3 className="animate text-3xl xl:text-5xl font-title text-fg-secondary">
        Formaciones y <br className="hidden lg:block" />
        acompañamiento
      </h3>
      <p className="animate" style={setAnim({ d: '100ms' })}>
        En Jevitas Intensas, contamos con una red de profesionales <br className="hidden lg:block" />
        femeninas en el área de bienestar, crecimiento personal, salud <br className="hidden lg:block" />
        y arte. Un espacio para brindar sesiones personalizadas, <br className="hidden lg:block" />
        programas y recursos de nuestra comunidad de expertas.
      </p>
      <CanonicalLink className="uppercase hover:underline text-fg-secondary items-center" style={{ display: 'inline-flex' }} href="#">Conoce más <span className="pl-2"><Arrow /></span> </CanonicalLink>
    </div>
  </div>

  <div className="flex flex-col lg:flex-row items-center justify-between w-full space-y-8 lg:space-y-0">
    <div className="w-full lg:w-1/2 flex flex-col">
      <Image src={Ideas} title="Laboratorio de ideas" placeholder="blur" className="w-full rounded-[2rem] lg:rounded-none pointer-events-none select-none" quality={100} />
    </div>
    <div className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-6">
      <h3 className="animate text-3xl xl:text-5xl font-title text-fg-secondary">
        Laboratorio <br className="hidden lg:block" />
        de ideas
      </h3>
      <p className="animate" style={setAnim({ d: '100ms' })}>
        Acompañamos a mujeres que tienen pequeñas o medianas <br className="hidden lg:block" />
        empresas a través de consultorías, asesorías y prestación de <br className="hidden lg:block" />
        servicios en el área de marketing, diseño, comunicaciones y <br className="hidden lg:block" />
        relaciones públicas.
      </p>
      <CanonicalLink className="uppercase hover:underline text-fg-secondary items-center" style={{ display: 'inline-flex' }} href="#">Conoce más <span className="pl-2"><Arrow /></span> </CanonicalLink>
    </div>
  </div>
</div>

export default Acompa
