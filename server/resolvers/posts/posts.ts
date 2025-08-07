import { useRuntimeConfig } from '#imports'
import { useSortOptions } from '../../composables'
import type { Post, QueryAllPostArgs, QueryPostArgs } from '../resolvers-types'

const config = useRuntimeConfig()

export const post = async (_: unknown, { id }: QueryPostArgs) => {
  const res = await $fetch<Post[]>(`${config.manguitoPageUrl}/api/post`)
  const selectedPost = res.find((post) => post._id === id)
  if (!selectedPost) return null
  return selectedPost
}

export const allPost = async (_: unknown, { sort }: QueryAllPostArgs) => {
  const res = await $fetch<Post[]>(`${config.manguitoPageUrl}/api/post`)
  return useSortOptions<Post>(res, sort)
}
