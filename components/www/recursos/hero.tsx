import Shapes from './svg/shape.svg'
import Rainbow from './svg/rainbow.svg'
import Annella from '@/public/images/welcome.png'
import Image from 'next/image'
import { Button } from '@/components/button'
import { useRouter } from 'next/router'
import { useRefWithCallback } from '@/lib/hooks'
import { useCallback, useRef } from 'react'

const Hero = () => {
  const { query } = useRouter()
  const callbackRef = useRef<() => void>()
  const { category } = query
  const length = 3
  const [_, setRef] = useRefWithCallback<HTMLDivElement>(node => {
    setJustify(node)
    callbackRef.current = () => setJustify(node)
    window.addEventListener('resize', callbackRef.current)
  }, () => {
    removeEventListener('resize', callbackRef.current)
  })
  const setJustify = useCallback((node?: HTMLDivElement) => {
    node.style.justifyContent = node.scrollWidth > node.clientWidth ? 'left' : 'center'
  }, [])
  return (
    <div className="flex items-center flex-col h-[70vh] bg-[#F0AD9D] justify-center relative">
      {category && category != 'offtopic' ? (
        <Image
          src={Annella}
          placeholder="blur"
          quality={100}
          layout="fill"
          objectFit="cover"
          className={'duration-[0.6s]'}
        />
      ) : null}
      <div className="absolute w-full h-full" style={{ background: 'rgba(240, 173, 157, 0.8)' }} />
      <Shapes className="absolute top-0 left-0 h-auto" />
      <Rainbow className="absolute bottom-0 right-0 h-auto w-7/10 sm:w-auto" />
      <div className="flex flex-col space-y-4 sm:space-y-10 relative text-center items-center">
        <h2 className="font-title text-5xl lg:text-7xl text-white relative">Recursos</h2>
        <p className="text-[#E8521F] font-bold sm:font-normal sm:font-title sm:text-xl text-center">
          Recursos descargables que diseñamos con<br />
          mucho amor para nuestra comunidad
        </p>
      </div>
      <div className="absolute c-lg bottom-0">
        <div className={`flex space-x-4 py-8 overflow-x-scroll noScrollBar`} ref={setRef}>
          {Array.from({ length }, (_, idx) => idx + 1).map(v => (
            <Button
              key={v}
              style={{ whiteSpace: 'nowrap' }}
              title={'Categoría ' + v}
              type={category as string == String(v) ? 'primary' : 'secondary'}
              href={category as string == String(v) ? '/recursos' : `/recursos?category=${v}`}
              shallow
            />
          ))}
          <Button
            style={{ whiteSpace: 'nowrap' }}
            title="Off-topic"
            type={category as string == 'offtopic' ? 'primary' : 'secondary'}
            href={category as string == 'offtopic' ? '/recursos' : `/recursos?category=offtopic`}
            shallow
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
