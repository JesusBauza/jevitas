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

type Post = {
  slug: string
  title: string
  description: string
  body: any
  updatedAt: string
  categories: { name: string, slug: string }[]
  cover: {
    responsiveImage: any
  }
}

const query = `
query PostQuery($slug: String) {
  post(filter: { slug: { eq: $slug }, published: { eq: true } }) {
    description
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
    body {
      value
      blocks {
        __typename
        ... on  MediaBlockRecord{
          id
          image {
            ${responsiveImageHelper({ w: 800 })}
          }
        }
      }
    }
  }
}
`

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params
  try {
    const { post } = await datoCMSFetcher<{ post: Post }>(query, { slug })
    if (!post) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        post,
      },
      revalidate: 1,
    }

  } catch {
    return {
      notFound: true
    }
  }
}

const paths_query = `
query PathsQuery {
  allPosts {
    slug
  }
}
`

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const { allPosts } = await datoCMSFetcher(paths_query)
  return {
    paths: allPosts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

export const Slug: PageWithLayout<{ post: Post }> = (postFallback) => {
  const { query: urlQuery, replace } = useRouter()
  const variables = useMemo(() => ({ slug: urlQuery.slug }), [urlQuery])
  const { data } = useDatoCMSApi<{ post: Post }>(query, {
    variables,
    swrConfig: {
      fallbackData: postFallback,
    }
  })

  useEffect(() => {
    if (!data.post) {
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
  return data?.post ? (
    <div className="bg-white">
      <div className="flex items-center flex-col h-[70vh] bg-[#F0BE69] justify-center relative">
        <div className="absolute w-full h-full overflow-hidden">
          <Image
            data={data.post.cover.responsiveImage}
            fadeInDuration={600}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            pictureClassName="object-cover"
          />
        </div>
        <div className="absolute w-full h-full" style={{ background: 'rgba(240, 190, 105, 0.8)' }} />
        <div className="flex flex-col space-y-4 sm:space-y-10 relative text-center items-center">
          <div className="flex flex-col">
            <p className="text-[#4E4C4D] font-bold sm:font-normal sm:font-title sm:text-xl text-center">
              Nuestro blog
            </p>
            <h2 className="font-title text-5xl lg:text-7xl text-white relative">{data.post.title}</h2>
          </div>
          <p className="font-bold font-bold text-xs sm:text-sm text-center lg:w-5/10 px-4">
            {data.post.description}
          </p>
        </div>
        <div className="absolute c-lg bottom-0">
          <div className={`flex space-x-4 py-8 overflow-x-scroll noScrollBar`} ref={setRef}>
            {data.post.categories?.map(c => (
              <Button
                key={c.slug}
                style={{ whiteSpace: 'nowrap' }}
                title={c.name}
                type={'secondary'}
                href={`/blog?category=${c.slug}`}
                shallow
              />
            ))}
          </div>
        </div>
      </div>
      <Viewport className="w-full px-4 pb-16 mx-auto lg:w-5/10 animate prose prose-pink py-16" oneWay style={setAnim({ y: '0.5rem' })}>
        <StructuredText
          data={data.post.body}
          renderBlock={({ record }) => {
            if (record.__typename === 'MediaBlockRecord') {
              const image = record.image as any
              return image ? (
                <div className="my-6 lg:-mx-24 animate">
                  <Image data={image.responsiveImage} pictureStyle={{ margin: '0' }} className="rounded-xl" />
                </div>
              ) : null
            }

            return (
              <>
                <p className="font-bold t-h3">Oops, dejémosle esto al programador</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            )
          }}
        />
      </Viewport>
    </div>
  ) : null
}

Slug.getLayoutProps = (({ post }) => ({
  title: post.title,
}))

export default Slug
