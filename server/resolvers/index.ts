import { allPost, post } from './posts'
import type { QueryResolvers } from './resolvers-types'

export const query: QueryResolvers = {
  allPost,
  post,
}
