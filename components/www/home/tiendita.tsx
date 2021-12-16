import Viewport, { setAnim } from '@/components/viewport'
import { use100vh } from 'react-div-100vh'
import { useDatoCMSApi } from '@/lib/fetcher'
import { responsiveImageHelper } from '@/lib/datocms'
import { Image } from 'react-datocms'
import CanonicalLink from '@/components/canonical-link'

type Product = {
  image: {
    responsiveImage: any
  }
  name: string
  price: number
  slug: string
}

const query = `
query Products {
  products: allProducts(first: 3) {
    image {
      ${responsiveImageHelper({ w: 282, h: 292, fit: 'crop' })}
    }
    name
    price
    slug
  }
}`

const sample = {
  image: '/images/image1.png',
  title: 'T-Shirt Jevi',
  price: 20,
}

const Tiendita = () => {
  const sH = use100vh()
  const { data } = useDatoCMSApi<{ products: Product[] }>(query)
  return (
    data?.products ? (
      <>
        <div className="bg-white w-full relative">
          <Viewport
            className="flex flex-col justify-center items-center space-y-16 min-h-[var(--min-h)] c-lg py-16"
            style={{ ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 97px)`, perspective: 1000 }}
          >
            <div className="flex flex-col space-y-8 w-full text-center" style={setAnim({ y: '0.5rem' })}>
              <h3 className="animate text-3xl xl:text-5xl font-title text-[#4E4C4D]">
                Nuestra tiendita
              </h3>
              <p className="animate" style={setAnim({ d: '100ms' })}>
                Nuestra línea de mercancía está pensada para <br className="hidden sm:block" />
                despertar el espíritu creativo de mujeres.
              </p>
            </div>
            <Viewport className="grid lg:grid-cols-3 w-full gap-16 sm:gap-32" style={setAnim({ y: '0.5rem' })}>
              {data.products.map((p, idx) => (
                <div className="animate" style={setAnim({ d: `${400 + (100 * idx)}ms` })} key={idx}>
                  <CanonicalLink href={`/tiendita?store-page=${p.slug}`} className="flex flex-col space-y-4 animate transform hover:scale-105 duration-200" style={{ transitionDelay: '0s' }}>
                    <div className="rounded-2xl overflow-hidden">
                      <Image
                        data={{
                          ...p.image.responsiveImage,
                          alt: p.name
                        }}
                        className="overflow-hidden w-full rounded-3xl shadow-lg"
                      />
                    </div>
                    <div className="flex w-full justify-between">
                      <h4 className="font-title text-2xl">{p.name}</h4>
                      <p className="text-2xl">${p.price.toFixed(2)}</p>
                    </div>
                  </CanonicalLink>
                </div>
              ))}
            </Viewport>
          </Viewport>
        </div>
      </>
    ) : null
  )
}

export default Tiendita
