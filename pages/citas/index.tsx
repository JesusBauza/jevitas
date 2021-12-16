import { PageWithLayout } from '@/components/page'
import { datoCMSFetcher } from '@/lib/fetcher'
import Content from '@www/citas/content'
import Hero from '@www/citas/hero'
import { GetStaticProps } from 'next'
import { createContext, useContext } from 'react'

export type CitasData = {
  cost: number
}

export const getStaticProps: GetStaticProps<CitasData> = async (context: any) => {
  let props: CitasData
  try {
    props = (await datoCMSFetcher(`{
      token {
        cost
      }
    }`)).token
  } catch (err) {
    console.error(err)
  }
  return {
    props,
    revalidate: 1,
  }
}

export const citasContext = createContext<CitasData>(null)
export const useCitasData = () => useContext(citasContext)

const JeviLab: PageWithLayout<CitasData> = props => {
  return (
    <citasContext.Provider value={props}>
      <div className="bg-white overflow-hidden">
        <Hero />
        <Content />
      </div>
    </citasContext.Provider>
  )
}

JeviLab.getLayoutProps = (() => ({
  title: 'Citas',
  navbarColor: '#C4D7D1',
  logoColor: 'white',
}))

export default JeviLab
