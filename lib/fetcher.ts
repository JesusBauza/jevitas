import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'

export type FethcerError = Error & {
  info?: any
  status?: number
}

export const serviceFetcher = async (key: string, req: RequestInit) => {
  const res = await fetch(key, req)
  if (!res.ok) {
    const error: FethcerError = new Error(`An error occurred while fetching the data.\nKey: ${key}`)

    error.info = await res.json()
    error.status = res.status

    throw error
  }
  return res.json()
}

export declare type Variables = {
  [key: string]: any
}

export const datoCMSFetcher = <T = any>(query: string, variables?: Variables) => {
  const endpoint = `https://graphql.datocms.com/`

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
  })

  return client.request<T>(query, variables)
}

export const useDatoCMSApi = <T = any>(query: string, options?: {
  variables?: Variables,
  swrConfig?: SWRConfiguration<T>
}) => {
  const variables = useMemo(() => options?.variables, [options])
  return useSWR<T>(query ? (variables ? [query, variables] : query) : null, datoCMSFetcher, options?.swrConfig)
}

export const serviceMultipleFetcher = (keys: string[], req: RequestInit) => {
  return Promise.all(keys.map(k => serviceFetcher(k, req)))
}
