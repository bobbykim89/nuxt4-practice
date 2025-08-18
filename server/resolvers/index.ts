import type { QueryResolvers } from '#shared/graphql/resolvers-types'
import { allPost, post } from './posts'

export const query: QueryResolvers = {
  allPost,
  post,
}
