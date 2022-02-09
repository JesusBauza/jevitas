import { Button } from '@/components/button'
import { PageWithLayout } from '@/components/page'
import Viewport, { setAnim } from '@/components/viewport'
import { responsiveImageHelper } from '@/lib/datocms'
import { datoCMSFetcher, useDatoCMSApi } from '@/lib/fetcher'
import { useRefWithCallback } from '@/lib/hooks'
import { GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Image, StructuredText } from 'react-datocms'

type Resource = {
  slug: string
  title: string
  updatedAt: string
  description: string
  categories: { name: string, slug: string }[]
  cover: {
    responsiveImage: any
  }
  link?: string
  file?: {
    url: string
  }
}

const query = `
query ResourceQuery($slug: String) {
  resource(filter: { slug: { eq: $slug }, published: { eq: true } }) {
    categories {
      name
      slug
    }
    cover {
      ${responsiveImageHelper({ w: 800 })}
    }
    updatedAt
    slug
    title
    description
    link
    file {
      url
    }
  }
}
`

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params
  const { resource } = await datoCMSFetcher<{ resource: Resource }>(query, { slug })
  if (!resource) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      resource,
    },
    revalidate: 1,
  }
}

const paths_query = `
query PathsQuery {
  allResources {
    slug
  }
}
`

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const { allResources } = await datoCMSFetcher(paths_query)
  return {
    paths: allResources.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

export const Slug: PageWithLayout<{ resource: Resource }> = (fallbackData) => {
  const { query: urlQuery, replace } = useRouter()
  const variables = useMemo(() => ({ slug: urlQuery.slug }), [urlQuery])
  const { data } = useDatoCMSApi<{ resource: Resource }>(query, {
    variables,
    swrConfig: {
      fallbackData,
    }
  })

  useEffect(() => {
    if (!data.resource) {
      replace('/404', window.location.pathname)
    }
  }, [data])

  const callbackRef = useRef<() => void>()
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
  return data?.resource ? (
    <div className="bg-white">
      <div className="flex items-center flex-col h-[70vh] bg-[#F0BE69] justify-center relative">
        <div className="absolute w-full h-full overflow-hidden">
          <Image
            data={data.resource.cover.responsiveImage}
            fadeInDuration={600}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            pictureClassName="object-cover"
          />
        </div>
        <div className="absolute w-full h-full" style={{ background: 'rgba(240, 173, 157, 0.8)' }} />
        <div className="flex flex-col space-y-4 sm:space-y-10 relative text-center items-center">
          <div className="flex flex-col">
            <p className="text-[#4E4C4D] font-bold sm:font-normal sm:font-title sm:text-xl text-center">
              Recursos
            </p>
            <h2 className="font-title text-5xl lg:text-7xl text-white relative">{data.resource.title}</h2>
          </div>
        </div>
        <div className="absolute c-lg bottom-0">
          <div className={`flex space-x-4 py-8 overflow-x-scroll noScrollBar`} ref={setRef}>
            {data.resource.categories?.map(c => (
              <Button
                key={c.slug}
                style={{ whiteSpace: 'nowrap' }}
                title={c.name}
                type={'secondary'}
                href={`/recursos?category=${c.slug}`}
                shallow
              />
            ))}
          </div>
        </div>
      </div>
      <Viewport className="py-16 grid c-lg gap-24 grid-cols-1 lg:grid-cols-2" oneWay style={setAnim({ y: '0.5rem' })}>
        <Image
          data={data.resource.cover.responsiveImage}
          fadeInDuration={600}
          className="w-full h-full rounded-3xl shadow-lg overflow-hidden"
        />
        <div className="flex flex-col space-y-8">
          <p className="font-bold text-sm text-gray-400">{data.resource.description}</p>
          <h3 className="animate text-2xl lg:text-2xl xl:text-4xl font-title">
            Zona de descargas
          </h3>
          <div className="flex space-y-6 sm:space-y-0 sm:space-x-6 items-center w-full flex-col sm:flex-row">
            {data.resource.link ? (
              <a
                href={data.resource.link}
                className="hover:underline text-blue-500 font-bold py-4 border-2 border-transparent"
                target="_blank"
              >
                Ir al link anexado
              </a>
            ) : null}
            {data.resource.file ? (
              <a
                href={data.resource.file.url}
                className="text-blue-500 font-bold flex border-2 border-blue-500 px-2 py-4 rounded duration-200 hover:text-white hover:bg-blue-500"
                target="_blank"
              >
                Ver archivo anexado
              </a>
            ) : null}
          </div>
        </div>
      </Viewport>
    </div>
  ) : null
}

Slug.getLayoutProps = (({ resource }) => ({
  title: resource.title,
}))

export default Slug
