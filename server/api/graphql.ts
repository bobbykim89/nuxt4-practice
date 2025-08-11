import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { readFileSync } from 'fs'
import { query } from '../resolvers'

let typeDefs: string
if (process.env.NODE_ENV === 'development') {
  typeDefs = readFileSync(`${process.cwd()}/server/public/schema.graphql`, {
    encoding: 'utf-8',
  })
} else {
  typeDefs = readFileSync(`${process.cwd()}/public/schema.graphql`, {
    encoding: 'utf-8',
  })
}

const resolvers = {
  Query: query,
}

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateH3Handler(apollo)
