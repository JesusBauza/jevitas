import CanonicalLink from '@/components/canonical-link'
import { PageWithLayout } from '@/components/page'
import Viewport, { setAnim } from '@/components/viewport'
import { responsiveImageHelper } from '@/lib/datocms'
import Hero from '@www/recursos/hero'

import RainbowL from '@www/blog/svg/card-rainbow-l.svg'
import RainbowR from '@www/blog/svg/card-rainbow-r.svg'

import HeartL from '@www/blog/svg/card-heart-l.svg'
import HeartR from '@www/blog/svg/card-heart-r.svg'

import { datoCMSFetcher, useDatoCMSApi } from '@/lib/fetcher'
import { GetStaticProps } from 'next'
import { Image } from 'react-datocms'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

type Resource = {
  slug: string
  title: string
  updatedAt: string
  categories: { name: string, slug: string }[]
  cover: {
    responsiveImage: any
  }
}

type Category = {
  slug: string
  name: string
  cover: any
}

const query = `
query {
  resources: allResources(filter: { published: { eq: true } }) {
    categories {
      name
      slug
    }
    cover {
      ${responsiveImageHelper({ w: 320, h: 212, q: 80, fit: 'crop' })}
    }
    updatedAt
    slug
    title
  }
  categories: allResourceCategories {
    name
    slug
    cover {
      ${responsiveImageHelper()}
    }
  }
}`


export const getStaticProps: GetStaticProps = async (context: any) => {
  const data = await datoCMSFetcher(query)
  return {
    props: {
      ...data,
    },
    revalidate: 1,
  }
}

const Card = ({ idx, resource }: { idx: number, resource: Resource }) => (
  <Viewport oneWay className="animate" style={setAnim({ y: '-0.5rem' })}>
    <CanonicalLink href={`/recursos/${resource.slug}`} className="flex flex-col w-full space-y-4 hover:scale-105 transform duration-500">
      <div className="relative">
        {idx % 2 !== 0 ? (
          <>
            <RainbowL className="absolute left-0 bottom-0 w-6/10" style={{ transform: 'translate(-6rem, 4rem)' }} />
            <RainbowR className="absolute right-0 top-0 w-6/10" style={{ transform: 'translate(5rem, -6.5rem)' }} />
          </>
        ) : (
          <>
            <HeartL className="absolute left-0 bottom-0 w-6/10" style={{ transform: 'translate(-8rem, 0rem)' }} />
            <HeartR className="absolute right-0 top-0 w-6/10" style={{ transform: 'translate(5rem, -3.5rem)' }} />
          </>
        )}
        <Image
          data={{
            ...resource.cover.responsiveImage,
            alt: resource.title,
          }}
          className="rounded-3xl overflow-hidden relative w-full"
        />
      </div>
      <div className="flex flex-wrap gap-2 relative">
        {resource.categories.length ? resource.categories.map(v => (
          <CanonicalLink href={`/recursos?category=${v.slug}`} className="text-xs font-bold text-fg-primary hover:underline" key={v.slug} shallow>
            {v.name}
          </CanonicalLink>
        )) : (
          <CanonicalLink href={`/recursos?category=offtopic`} className="text-xs font-bold text-fg-primary hover:underline" shallow>
            Off-topic
          </CanonicalLink>
        )}
      </div>
      <h4 className="font-bold text-lg lg:text-xl text-[#37444D] relative">
        {resource.title}
      </h4>
    </CanonicalLink>
  </Viewport>
)


type ResourcesData = {
  resources: Resource[]
  categories: Category[]
}

const Resources: PageWithLayout<ResourcesData> = (fallbackData) => {
  const { data } = useDatoCMSApi<ResourcesData>(query, {
    swrConfig: {
      fallbackData,
    }
  })
  const router = useRouter()

  const filtered = useMemo(() => {
    if (!data) return [];

    const resources = data.resources
    if (!router.query.category) return resources;
    if (router.query.category === 'offtopic') return resources
      .filter(p => !p.categories.length);
    return resources.filter(p => p.categories.find(pp => pp.slug == router.query.category))
  }, [router.query, data])
  return (
    <div className="bg-white overflow-hidden">
      <Hero categories={data?.categories || []} />
      {data ? (
        <div className="c-lg grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-24 lg:gap-32 py-32">
          {filtered?.length ? filtered?.map((p, idx) => (
            <Card idx={idx} resource={p} key={idx} />
          )) : (
            <Viewport className="text-gray-400 font-title text-4xl text-center col-span-full animate" once style={setAnim({ y: '-0.5rem' })}>
              Nada por acá 😥
            </Viewport>
          )}
        </div>
      ) : null}
    </div>
  )
}

Resources.getLayoutProps = (() => ({
  title: 'Recursos',
}))

export default Resources
