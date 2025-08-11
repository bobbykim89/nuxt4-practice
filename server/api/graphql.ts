import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { query } from '../resolvers'
import { typeDefs } from '../schema'

const resolvers = {
  Query: query,
}

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateH3Handler(apollo)
