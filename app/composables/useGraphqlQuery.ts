import type { UseFetchOptions } from '#app'

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
interface PageQueryVariableOptions {
  [key: string]: string | PageQueryVariableOptions
}
interface UsePageQueryReturn<T> {
  data: T
}

export const useGraphqlQuery = async <T>(
  query: string,
  variables: PageQueryVariableOptions = {},
  options: WithRequired<
    Omit<
      UseFetchOptions<UsePageQueryReturn<T>>,
      'method' | 'headers' | 'body' | 'getCachedData'
    >,
    'key'
  >,
) => {
  // backup data key, manually setting a key would be better but this makes sure we're keying by default
  const { data } = await useFetch<UsePageQueryReturn<T>, Error>(
    '/api/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      deep: false,
      ...options,
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    },
  )
  return data.value?.data
}
