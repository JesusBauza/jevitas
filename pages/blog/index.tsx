import CanonicalLink from '@/components/canonical-link'
import { PageWithLayout } from '@/components/page'
import Hero from '@www/blog/hero'

import RainbowL from '@www/blog/svg/card-rainbow-l.svg'
import RainbowR from '@www/blog/svg/card-rainbow-r.svg'

import HeartL from '@www/blog/svg/card-heart-l.svg'
import HeartR from '@www/blog/svg/card-heart-r.svg'

import { responsiveImageHelper } from '@/lib/datocms'
import { datoCMSFetcher, useDatoCMSApi } from '@/lib/fetcher'
import { Image } from 'react-datocms'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import Viewport, { setAnim } from '@/components/viewport'

type Post = {
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
  posts: allPosts(filter: { published: { eq: true } }) {
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
  categories: allBlogCategories {
    name
    slug
    cover {
      ${responsiveImageHelper()}
    }
  }
}
`

export const getStaticProps: GetStaticProps = async (context: any) => {
  const data = await datoCMSFetcher<{ posts: Post[] }>(query)
  return {
    props: {
      ...data,
    },
    revalidate: 1,
  }
}

const Card = ({ idx, post }: { idx: number, post: Post }) => (
  <Viewport oneWay className="animate" style={setAnim({ y: '-0.5rem' })}>
    <CanonicalLink href={`/blog/${post.slug}`} className="flex flex-col w-full space-y-4 hover:scale-105 transform duration-500">
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
            ...post.cover.responsiveImage,
            alt: post.title,
          }}
          className="rounded-3xl overflow-hidden relative w-full"
        />
      </div>
      <div className="flex flex-wrap gap-2 relative">
        {post.categories.length ? post.categories.map(v => (
          <CanonicalLink href={`/blog?category=${v.slug}`} className="text-xs font-bold text-fg-primary hover:underline" key={v.slug} shallow>
            {v.name}
          </CanonicalLink>
        )) : (
          <CanonicalLink href={`/blog?category=offtopic`} className="text-xs font-bold text-fg-primary hover:underline" shallow>
            Off-topic
          </CanonicalLink>
        )}
      </div>
      <h4 className="font-bold text-lg lg:text-xl text-[#37444D] relative">
        {post.title}
      </h4>
    </CanonicalLink>
  </Viewport>
)

type BlogData = {
  posts: Post[]
  categories: Category[]
}

const BlogIndex: PageWithLayout<BlogData> = (fallbackData = { posts: [], categories: [] }) => {
  const { data } = useDatoCMSApi<BlogData>(query, {
    swrConfig: {
      fallbackData,
    }
  })
  const router = useRouter()

  const filteredPost = useMemo(() => {
    if (!data) return [];

    const posts = data.posts
    if (!router.query.category) return posts;
    if (router.query.category === 'offtopic') return posts
      .filter(p => !p.categories.length);
    return posts.filter(p => p.categories.find(pp => pp.slug == router.query.category))
  }, [router.query, data])
  return (
    <div className="bg-white overflow-hidden">
      <Hero categories={data?.categories || []} />
      {data ? (
        <div className="c-lg grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-24 lg:gap-32 py-32">
          {filteredPost?.length ? filteredPost?.map((p, idx) => (
            <Card idx={idx} post={p} key={idx} />
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

BlogIndex.getLayoutProps = (() => ({
  title: 'Nuestro blog',
}))

export default BlogIndex
