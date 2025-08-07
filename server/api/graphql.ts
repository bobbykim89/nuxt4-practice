import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { readFileSync } from 'fs'
import { query } from '../resolvers'

const typeDefs = readFileSync(`${process.cwd()}/server/schema.graphql`, {
  encoding: 'utf-8',
})

const resolvers = {
  Query: query,
}

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateH3Handler(apollo)
