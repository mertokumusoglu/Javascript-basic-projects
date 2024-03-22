import { createServer } from "node:http"
import { createYoga,  } from "graphql-yoga"
import { schema } from "./schema.js"
import db from "./data.json" assert {type: "json"}; 
import pubsub from "./pubsub.js"

const yoga = createYoga({ 
  schema,
  context: {
    db,
    pubsub,
  }
 })
const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})