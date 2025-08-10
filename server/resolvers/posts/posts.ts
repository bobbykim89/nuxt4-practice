import { useRuntimeConfig } from '#imports'
import { useSortOptions } from '../../composables'
import type {
  Post,
  PostConnection,
  PostWithNavigation,
  QueryAllPostArgs,
  QueryPostArgs,
} from '../resolvers-types'

const config = useRuntimeConfig()

export const post = async (
  _: unknown,
  { id }: QueryPostArgs,
): Promise<PostWithNavigation> => {
  // const res = await $fetch<Post[]>(`${config.manguitoPageUrl}/api/post`)
  // const selectedPost = res.find((post) => post._id === id)
  // if (!selectedPost) return null
  // return selectedPost
  const res = await $fetch<Post[]>(`${config.manguitoPageUrl}/api/post`)
  // const sortedPosts = allPosts.sort(
  //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  // )
  const currentIndex = res.findIndex((post) => post._id === id)

  console.log(currentIndex)

  if (currentIndex === -1) {
    return {
      post: null,
      previousPost: null,
      nextPost: null,
    }
  }
  const currentPost = res[currentIndex]
  const previousPost = currentIndex > 0 ? res[currentIndex - 1] : null
  const nextPost = currentIndex < res.length - 1 ? res[currentIndex + 1] : null

  return {
    post: currentPost,
    previousPost,
    nextPost,
  }
}

export const allPost = async (
  _: unknown,
  { sort, pagination }: QueryAllPostArgs,
): Promise<PostConnection> => {
  const res = await $fetch<Post[]>(`${config.manguitoPageUrl}/api/post`)
  // return useSortOptions<Post>(res, sort)

  let sortedPosts = res
  if (sort) {
    sortedPosts = useSortOptions<Post>(res, sort)
  }
  const limit = pagination?.limit || 30
  const offset = pagination?.offset || 0

  const totalCount = sortedPosts.length
  const paginatedPosts = sortedPosts.slice(offset, offset + limit)
  const hasMore = offset + limit < totalCount
  const nextOffset = hasMore ? offset + limit : null
  return {
    posts: paginatedPosts,
    totalCount,
    hasMore,
    nextOffset,
  }
}
