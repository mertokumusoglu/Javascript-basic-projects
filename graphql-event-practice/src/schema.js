import pubsub from "./pubsub.js"
import { createSchema } from 'graphql-yoga'
import resolvers from "./graphql/resolvers/index.js"
import typeDefs from "./graphql/type-defs/index.js"

export const schema = createSchema({
    typeDefs,
    resolvers,
})
