import Parallax from '@/components/parallax'
import Wave from '@/components/wave'
import Intro1 from './svg/intro1.svg'
import Intro2 from './svg/intro2.svg'
import Intro3 from './svg/intro3.svg'
import Viewport, { setAnim } from '@/components/viewport'
import { Button } from '@/components/button'
import Image from 'next/image'
import PsicoImg from './kellian.png'

const content = () => [
  {
    image: <Intro1 className="w-full lg:w-auto lg:h-[200px]" />,
    title: 'Rellenas el formulario de citas',
  },
  {
    image: <Intro2 className="w-full lg:w-auto lg:h-[200px]" />,
    title: 'Pagas el monto de la sesión',
  },
  {
    image: <Intro3 className="w-full lg:w-auto lg:h-[200px]" />,
    title: 'Te conectas por videollamada con la especialista',
  },
]

const Content = () => (
  <div className="relative w-full">
    <Parallax className="absolute w-full h-[150%] flex flex-col mt-[-37vh]" negative>
      <Wave className="w-full text-white" />
      <div className="bg-white h-[60%] w-full relative" />
    </Parallax>
    <Viewport className="flex flex-col c-lg space-y-12 py-6 relative mb-12" style={setAnim({ y: '0.5rem' })}>
      <div className="flex flex-col space-y-4 py-6 items-center animate">
        <h2 className="text-center text-2xl">¿Cómo funciona la terapia Online?</h2>
        <p className="font-bold text-[#C4D7D1] text-center animate">
          Tomar terapia con un psicólogo que se adapte a tu estilo <br className="hidden sm:block" />
          y ritmo de vida actual nunca fue tan sencillo y seguro
        </p>
      </div>

      <div className="space-y-6">
        <Viewport className="grid grid-cols-1 lg:grid-cols-3 w-full gap-32 pb-12">
          {content().map((c, idx) => (
            <div className="w-full flex flex-col animate" style={setAnim({ d: ((idx + 1) * 200) + 'ms', y: '0.5rem' })} key={idx}>
              {c.image}
              <h4 className="font-bold text-2xl text-center mt-8 mb-2">
                {c.title}
              </h4>
            </div>
          ))}
        </Viewport>
        <p className="font-bold text-[#BBBEC0] text-center animate">
          Una vez confirmada tu cita se te notificará vía email y la especialista se pondrá en contacto contigo
        </p>
      </div>
    </Viewport>
    <div className="bg-[#F6F6F6] relative py-16">
      <Viewport className="flex flex-col c-lg space-y-8 relative items-center" style={setAnim({ y: '0.5rem' })}>
        <div className="flex flex-col space-y-4 items-center animate">
          <h2 className="text-center text-2xl">¿Cúanto cuesta una sesión terapia online?</h2>
        </div>

        <Viewport className="flex flex-col items-center animate bg-[#C4D7D1] rounded-[3rem] px-12 py-4" style={setAnim({ y: '0.5rem' })}>
          <div className="flex flex-col space-y-4 items-center animate">
            <h2 className="text-center text-2xl text-white animate">Cita individual</h2>
            <p className="text-[#556876] text-center animate text-4xl sm:text-6xl">
              $23,57 USD
            </p>
            <p className="text-center text-white text-lg">de 50 minutos por videollamada</p>
          </div>
        </Viewport>


        <div className="flex flex-col space-y-4 items-center animate">
          <p className="font-bold text-[#C4D7D1] text-center animate text-xl">
            Habla con tu psicóloga de confianza cuando lo necesites
          </p>
          <p className="text-center animate text-xl">
            Tomar terapia con un psicólogo que se adapte a tu estilo <br className="hidden sm:block" />
            y ritmo de vida actual nunca fue tan sencillo y seguro
          </p>
        </div>

        <div className="animate font-bold" style={setAnim({ d: '200ms' })}>
          <Button title="Comenzar" className="lg:text-2xl" href="/cita/reservar" type="green" />
        </div>
      </Viewport>
    </div>
    <div className="bg-[#C4D7D1] w-full relative">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full lg:space-y-0">
        <div className="w-full lg:w-1/2 flex flex-col">
          <Image src={PsicoImg} title="Kellian Ojeda" placeholder="blur" objectFit="cover" className="w-full select-none" quality={100} />
        </div>
        <div className="w-full lg:w-1/2 py-8">
          <div className="flex flex-col c-lg space-y-6 lg:px-[5%]">
            <h3 className="animate text-3xl xl:text-5xl font-title text-[#556876] mb-6">
              Conoce a nuestra<br className="hidden lg:block" />
              especialista
            </h3>
            <p className="animate" style={setAnim({ d: '100ms' })}>
              Soy Kellian Ojeda, psicóloga mención clínica y te acompaño a alcanzar nuevos niveles de bienestar integral.
            </p>
            <p className="animate" style={setAnim({ d: '100ms' })}>
              Mi especialidad es potenciar el bienestar femenino integral, para lograr un reconocimiento de tu estilo personal desde: el autoconocimiento, la autoestima y el autocuidado. Haciendo de la regulación emocional parte de tu vida. Estoy feliz de ayudarte y ser parte de tu proceso de crecimiento.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Viewport className="flex flex-col c-lg space-y-12 py-32 relative items-center" style={setAnim({ y: '0.5rem' })}>
      <div className="flex flex-col space-y-4 items-center animate">
        <h2 className="text-center text-3xl font-black animate">¿Eres psicóloga clínica?</h2>
        <p className="font-bold text-[#C4D7D1] text-center animate text-2xl">
          Sé parte de nuestro equipo
        </p>
      </div>

      <div className="flex flex-col space-y-4 items-center animate">
        <p className="font-bold text-center animate text-xl">
          Únete a comunidad de especialistas y ayudemos <br className="hidden sm:block" />
          a miles de mujeres a recuperar la estabilidad <br className="hidden sm:block" />
          emocional que necesitan para su vida diaria.
        </p>
      </div>

      <div className="animate font-bold" style={setAnim({ d: '200ms' })}>
        <Button title="Deseo unirme" className="lg:text-2xl" href="/contacto" type="green" />
      </div>
    </Viewport>

    <div className="bg-[#4E4C4D] relative">
      <div className="c-lg py-12">
        <p className="text-white">
          <strong>Importante:</strong> Los servicios disponibles a través de Jevitas Intensas son proporcionados de forma independiente por profesionales en salud mental certificados. Jevitas Intensas no proporciona ningún servicio de salud mental u otros de atención médica. Los profesionales en salud mental no pre-escriben medicamentos a través de Jevitas Intensas. Si estás experimentando una crisis o emergencia, comunícate a los servicios de emergencia más cercanos a tu localidad.
        </p>
      </div>
    </div>
  </div >
)
export default Content
