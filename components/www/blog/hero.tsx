import Shapes from './svg/shape.svg'
import Rainbow from './svg/rainbow.svg'
import { Button } from '@/components/button'
import { useRouter } from 'next/router'
import { useRefWithCallback } from '@/lib/hooks'
import { useCallback, useMemo, useRef } from 'react'
import { useDatoCMSApi } from '@/lib/fetcher'
import { responsiveImageHelper } from '@/lib/datocms'
import { Image } from 'react-datocms'

const CATEGORIES = `{
  categories: allBlogCategories {
    name
    slug
    cover {
      ${responsiveImageHelper()}
    }
  }
}
`

type Category = {
  slug: string
  name: string
  cover: any
}

const Hero = (fallbackData: { categories: Category[] }) => {
  const { query } = useRouter()
  const callbackRef = useRef<() => void>()
  const { category } = query
  const { data: { categories } } = useDatoCMSApi<{ categories: Category[] }>(CATEGORIES, {
    swrConfig: {
      onSuccess: (data) => console.log(data),
      fallbackData 
    }
  })
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
  const categoryData = useMemo(() => categories?.find(c => c.slug === category as string), [categories, category])
  return (
    <div className="flex items-center flex-col h-[70vh] bg-[#EB5153] justify-center relative">
      {categories && category && category != 'offtopic' && categoryData?.cover ? (
        <div className="absolute w-full h-full overflow-hidden">
          <Image
            data={categoryData.cover.responsiveImage}
            fadeInDuration={600}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            pictureClassName="object-cover"
          />
        </div>
      ) : null}
      <div className="absolute w-full h-full" style={{ background: 'rgba(240, 190, 105, 0.8)' }} />
      <Shapes className="absolute top-0 left-0 h-auto" />
      <Rainbow className="absolute bottom-0 right-0 h-auto w-7/10 sm:w-auto" />
      <div className="flex flex-col space-y-4 sm:space-y-10 relative text-center items-center">
        <h2 className="font-title text-5xl lg:text-7xl text-white relative">Nuestro blog</h2>
        <p className="text-[#4E4C4D] font-bold sm:font-normal sm:font-title sm:text-xl text-center">
          Este es nuestro espacio para compartir<br />
          cositas con nuestra comunidad
        </p>
      </div>
      <div className="absolute c-lg bottom-0">
        <div className={`flex space-x-4 py-8 overflow-x-scroll noScrollBar`} ref={setRef}>
          {categories?.map(c => (
            <Button
              key={c.slug}
              style={{ whiteSpace: 'nowrap' }}
              title={c.name}
              type={category as string == c.slug ? 'primary' : 'secondary'}
              href={category as string == c.slug ? '/blog' : `/blog?category=${c.slug}`}
              shallow
            />
          ))}
          {categories ? (
            <Button
              style={{ whiteSpace: 'nowrap' }}
              title="Off-topic"
              type={category as string == 'offtopic' ? 'primary' : 'secondary'}
              href={category as string == 'offtopic' ? '/blog' : `/blog?category=offtopic`}
              shallow
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Hero
