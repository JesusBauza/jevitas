import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import Cover from './svg/podcast.svg'
import IframeResizer from 'iframe-resizer-react'
import { useHomeData } from '@/pages'

const Podcast = () => {
  const sH = use100vh()
  const { podcast } = useHomeData()
  return (
    <div className="bg-white w-full flex flex-col py-16">
      <Viewport
        className="flex flex-col-reverse pt-8 pb-4 c-lg items-center lg:flex-row lg:space-x-16 lg:py-0 xl:min-h-[var(--min-h)] relative"
        style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 84px)` }}
      >
        <div className="flex w-full pb-8 pt-16 animate lg:py-0 lg:w-1/2 justify-center relative" style={setAnim({ d: '400ms', y: '-0.5rem', x: '-0.5rem' })}>
          <Cover className="w-full" />
          {/* <Image src={Intensidades} placeholder="blur" className="w-full" /> */}
        </div>
        <div className="flex flex-col space-y-8 w-full lg:w-1/2" style={setAnim({ y: '1rem' })}>
          <div className="flex flex-col">
            <h3 className="animate text-xl text-[#556876] uppercase font-bold">
              Podcast
            </h3>
            <h4 className="animate text-3xl xl:text-5xl font-title text-fg-secondary">
              {podcast.title}
            </h4>
          </div>

          <div
            className="flex flex-col space-y-8 w-full animate"
            style={setAnim({ d: '100ms' })}
            dangerouslySetInnerHTML={{ __html: podcast.text }}
          />
        </div>
      </Viewport>
      <Viewport className="c-lg animate" style={setAnim({ y: '0.2rem' })} oneWay>
        <IframeResizer
          heightCalculationMethod="lowestElement"
          src="https://anchor.fm/jevitasintensas/embed"
          style={{ width: '100%', minWidth: '100%' }}
        />
      </Viewport>
    </div>
  )
}

export default Podcast
