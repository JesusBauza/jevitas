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
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'

type Post = {
  slug: string
  title: string
  updatedAt: string
  categories: { name: string, slug: string }[]
  cover: {
    responsiveImage: any
  }
}

const query = `
query {
  posts: allPosts {
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
}
`

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { posts } = await datoCMSFetcher<{ posts: Post[] }>(query)
  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

const Card = ({ idx, post }: { idx: number, post: Post }) => (
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
      {post.categories.map(v => (
        <CanonicalLink href={`/blog?category=${v.slug}`} className="text-xs font-bold text-fg-primary hover:underline" key={v.slug}>
          {v.name}
        </CanonicalLink>
      ))}
    </div>
    <h4 className="font-bold text-lg lg:text-xl text-[#37444D] relative">
      {post.title}
    </h4>
  </CanonicalLink>
)

const BlogIndex: PageWithLayout<{ posts: Post[] }> = (fallbackData) => {
  const { data } = useDatoCMSApi<{ posts: Post[] }>(query, {
    swrConfig: {
      fallbackData
    }
  })
  const router = useRouter()
  const filterPosts = useCallback((posts: Post[]) => {
    if (!router.query.category)
      return posts;
    if (router.query.category === 'offtopic')
      return posts.filter(p => !p.categories.length);
    return posts.filter(p => p.categories.some(pp => pp.slug == p.slug))
  }, [router.query])
  return (
    <div className="bg-white overflow-hidden">
      <Hero />
      {data ? (
        <div className="c-lg grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-24 lg:gap-32 py-32">
          {filterPosts(data.posts).map((p, idx) => (
            <Card idx={idx} post={p} key={idx} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

BlogIndex.getLayoutProps = (() => ({
  title: 'Nuestro blog',
}))

export default BlogIndex
