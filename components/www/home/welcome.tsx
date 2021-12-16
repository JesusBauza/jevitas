import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Annella from '@/public/images/annella.png'
import Image from 'next/image'
import Hearts from './svg/hearts.svg'
import { useHomeData } from '@/pages'

const Welcome = () => {
  const sH = use100vh()
  const { welcome } = useHomeData()
  return (
    <>
      <div className="bg-[#f8f3ef] w-full relative">
        <Hearts className="absolute top-[2%] hidden sm:block origin-top-left transform scale-75" />
        <Viewport
          className="flex flex-col py-8 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)]"
          style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 97px)`, perspective: 1000 }}
        >
          <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '0.5rem' })}>
            <h1 className="animate text-3xl xl:text-5xl font-title text-[#4E4C4D]">
              {welcome.title}
            </h1>
            <div
              className="space-y-6"
              dangerouslySetInnerHTML={{ __html: welcome.text }}
            />
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
