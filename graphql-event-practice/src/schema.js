
//schema.js
import pubsub from "./pubsub.js"
import db from "./data.json" assert {type: "json"}; 
import { createSchema} from 'graphql-yoga'
import { gql } from 'graphql-tag';
import resolvers from "./graphql/resolvers/index.js"

export const schema = createSchema({
    typeDefs: gql`
        type User {
            id: ID!
            username: String!
            email: String!
            events: [Event]!
        }
        input createUserInput {
            userName: String!
            email: String!
        }
        input updateUserInput {
            userName: String
            email: String
        }
        type Event {
            id: ID!
            title: String!
            desc: String!
            date: String!
            from: String!
            to: String!
            location_id: ID
            user_id: ID
            user: User
            location: Location
            participants: [Participant!]
        }
        input createEventInput {
            title: String!
            desc: String!
            date: String!
            from: String!
            to: String!
            location_id: ID!
            user_id: ID!
        }
        input updateEventInput {
            title: String
            desc: String
            date: String
            from: String
            to: String
            location_id: ID
            user_id: ID
        }
        type Location {
            id: ID!
            name: String!
            desc: String!
            lat: Int!
            lng: Int!
        }
        input createLocationInput {
            name: String!
            desc: String!
            lat: Int!
            lng: Int!
        }
        input updateLocationInput {
            name: String
            desc: String
            lat: Int
            lng: Int
        }
        type Participant {
            id: ID!
            user_id: ID!
            event_id: ID!
            user: User!
            event: Event!
        }
        input createParticipantInput {
            user_id: ID!
            event_id: ID!
        }
        input updateParticipantInput {
            user_id: ID
            event_id: ID
            }
        type DeletedCount {
            count: Int
        }
        type Query {
            # User
            users: [User!]
            user(id: ID!): User!
            # Event
            events: [Event!]!
            event(id: ID!): Event!
            # Location
            locations: [Location!]!
            location(id: ID!): Location!
            # Participant
            participants: [Participant!]!
            participant(id: ID!): Participant!
        }
        type Mutation {
            # User
            addUser(data: createUserInput!): User!
            updateUser(id: ID!, data: updateUserInput!): User!
            deleteUser(id: ID!): User!
            deleteAllUsers: DeletedCount
            # Event
            addEvent(data: createEventInput!): Event!
            updateEvent(id: ID!, data: updateEventInput!): Event!
            deleteEvent(id: ID!): Event!
            deleteAllEvents: DeletedCount
            # Location
            addLocation(data: createLocationInput!): Location!
            updateLocation(id: ID! ,data: updateLocationInput): Location!
            deleteLocation(id: ID!): Location!
            deleteAllLocations: DeletedCount!
            # Participant
            addParticipant(data: createParticipantInput!): Participant!
            updateParticipant(id: ID!, data: updateParticipantInput): Participant!
            deleteParticipant(id: ID!): Participant!
            deleteAllParticipants: DeletedCount!
        }
        type Subscription {
            # User Subscriptions
            userCreated: User!
            userUpdated: User!
            userDeleted: User!
            userCount: Int!
            # Event Subscriptions
            eventCreated: Event!
            eventUpdated: Event!
            eventDeleted: Event!
            # Location Subscriptions
            locationCreated: Location!
            locationUpdated: Location!
            locationDeleted: Location!
            # Participant Subscriptions
            participantCreated: Participant!
            participantUpdated: Participant!
            participantDeleted: Participant!
        }
    `,
    resolvers,
    context: {
        pubsub,
        db,
    }
})
    