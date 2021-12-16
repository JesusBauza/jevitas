import { PageWithLayout } from '@/components/page'
import { datoCMSFetcher } from '@/lib/fetcher'
import Content from '@www/programas/content'
import { GetStaticProps } from 'next'
import { createContext, useContext } from 'react'

export type ProgramsData = {
  ideas: string
  beYouMisma: string
  jeviretos: string
  jevicamp: string
}

export const getStaticProps: GetStaticProps<ProgramsData> = async (context: any) => {
  let props: ProgramsData
  try {
    props = (await datoCMSFetcher(`{
      program {
        ideas
        beYouMisma
        jeviretos
        jevicamp
      }
    }`)).program
  } catch (err) {
    console.error(err)
  }
  return {
    props,
    revalidate: 1,
  }
}

export const programsContext = createContext<ProgramsData>(null)
export const useProgramsData = () => useContext(programsContext)

const JeviLab: PageWithLayout<ProgramsData> = props => {
  return (
    <programsContext.Provider value={{...props}}>
      <div className="bg-white overflow-hidden w-full h-full">
        <Content />
      </div>
    </programsContext.Provider>
  )
}

JeviLab.getLayoutProps = (() => ({
  title: 'Programas',
}))

export default JeviLab
