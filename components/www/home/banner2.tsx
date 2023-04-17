import { Button } from '@/components/button'
import Viewport, { setAnim } from '@/components/viewport'
import Img from './svg/banner2.svg'
import Fig1 from './svg/banner2-fig1.svg'
import Fig2 from './svg/banner2-fig2.svg'
import { useHomeData } from '@/pages'

const Banner2 = () => {
  const { banners } = useHomeData()
  return (
    <>
      <div className="bg-[#EB5153] w-full overflow-hidden relative">
        <div className="absolute flex w-full h-full items-center">
          <Fig1 />
        </div>
        <div className="absolute flex w-full h-full items-center justify-end">
          <Fig2 />
        </div>
        <Viewport
          className="flex flex-col c-lg items-center lg:flex-row lg:space-x-16 lg:py-0"
          style={{ perspective: 1000 }}
        >
          <div className="flex flex-col space-y-8 w-full lg:w-2/3 py-8" style={setAnim({ y: '0.5rem' })}>
            <h1 className="animate text-3xl xl:text-5xl font-title text-white" dangerouslySetInnerHTML={{
          __html: banners?.bannerB?.replace(/\n/g, '<br class="hidden lg:block" />')
        }} />
            <div className="animate" style={setAnim({ d: '100ms', y: '0.5rem' })}>
              <Button href={banners?.bannerBLink} type="vintage" title="Únete a la comunidad" className="uppercase mr-auto" />
            </div>
          </div>
          <div className="flex w-full pt-16 animate lg:py-0 lg:w-1/3 justify-center items-end" style={setAnim({ d: '400ms', y: '0.5rem' })}>
            <Img className="w-full pt-8 -mb-10" />
          </div>
        </Viewport>
      </div>
    </>
  )
}

export default Banner2
