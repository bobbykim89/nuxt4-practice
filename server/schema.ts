export const typeDefs = `#graphql
type Query {
  post(id: ID!): PostWithNavigation
  allPost(sort: SortOption, pagination: PaginationInput): PostConnection
}

enum OrderType {
  ASC
  DESC
}

input SortOption {
  by: String
  order: OrderType
  limit: Int
}

input PaginationInput {
  limit: Int = 30
  offset: Int = 0
}

type PostConnection {
  posts: [Post!]!
  totalCount: Int!
  hasMore: Boolean!
  nextOffset: Int
}

type PostWithNavigation {
  post: Post
  previousPost: Post
  nextPost: Post
}

type Post {
  _id: ID!
  content: String
  imageId: String!
  date: String!
  updatedAt: String!
}

`
