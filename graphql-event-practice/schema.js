import database from "./data.json" assert { type: "json"};
import pubsub from "./pubsub.js"
import { createSchema} from 'graphql-yoga'
import {nanoid} from "nanoid";
import { gql } from 'graphql-tag';


export const schema = createSchema({
    typeDefs: gql`
        type User {
            id: ID!
            username: String!
            email: String!
            events: [Event!]
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
    resolvers: {
        Subscription: {
            // User subscriptions
            userCreated: {
                subscribe: () => pubsub.subscribe('userCreated'),
                resolve: payload => payload.userCreated
            },
            userUpdated: {
                subscribe: () => pubsub.subscribe("userUpdated"),
                resolve: payload => payload.userUpdated
            },
            userDeleted: {
                subscribe: () => pubsub.subscribe("userDeleted"),
                resolve: payload => payload.userDeleted
            },
            userCount: {
                subscribe: () => pubsub.subscribe("userCount"),
                resolve: payload => payload.userCount
            },
            // Event subscriptions
            eventCreated: {
                subscribe: () => pubsub.subscribe('eventCreated'),
                resolve: payload => payload.eventCreated
            },
            eventUpdated: {
                subscribe: () => pubsub.subscribe("eventUpdated"),
                resolve: payload => payload.eventUpdated
            },
            eventDeleted: {
                subscribe: () => pubsub.subscribe("eventDeleted"),
                resolve: payload => payload.eventDeleted
            },
            // Location subscriptions
            locationCreated: {
                subscribe: () => pubsub.subscribe('locationCreated'),
                resolve: payload => payload.locationCreated
            },
            locationUpdated: {
                subscribe: () => pubsub.subscribe("locationUpdated"),
                resolve: payload => payload.locationUpdated
            },
            locationDeleted: {
                subscribe: () => pubsub.subscribe("locationDeleted"),
                resolve: payload => payload.locationDeleted
            },
            // Participant subscription
            participantCreated: {
                subscribe: () => pubsub.subscribe('participantCreated'),
                resolve: payload => payload.participantCreated
            },
            participantUpdated: {
                subscribe: () => pubsub.subscribe("participantUpdated"),
                resolve: payload => payload.participantUpdated
            },
            participantDeleted: {
                subscribe: () => pubsub.subscribe("participantDeleted"),
                resolve: payload => payload.participantDeleted
            },
        },
        Query: {
            users: () => database.users,
            user: (parent, args) => {
                return database.users.find((user) => user.id === parseInt(args.id))
            },
            events: () => database.events,
            event: (parent, args) => {
                return database.events.find((event) => event.id === parseInt(args.id))
            },
            locations: () => database.locations,
            location: (parent, args) => {
                return database.locations.find((location) => parseInt(args.id) === parseInt(location.id))
            },
            participants: () => database.participants,
            participant: (parent, args) => {
                return database.participants.find((participant) => parseInt(args.id) === parseInt(participant.id))
            }
        },
        User: {
            events: (parent) => {
                return database.events.filter((event) => parseInt(parent.id) === parseInt(event.user_id))
            }
        },
        Event: {
            user: (parent) => {
                return database.users.find((user) => parseInt(parent.user_id) === parseInt(user.id))
            },
            location: (parent) => {
                return database.locations.find((location) => parseInt(location.id) === parseInt(parent.location_id))
            },
            participants: (parent) => {
                return database.participants.filter((participant) => parseInt(participant.event_id) === parseInt(parent.id))
            }
        },
        Participant: {
            user: (parent) => {
                return database.users.find((user) => parseInt(user.id) === parseInt(parent.user_id))
            },
            event: (parent) => {
                return database.events.find((event) => parseInt(event.id) === parseInt(parent.event_id))
            }
        },
        Mutation: {
            // USER MUTATİONS
            addUser: (parent, { data: { userName, email } }) => {
                const user = {
                    id: nanoid(),
                    username: userName,
                    email: email,
                };
                database.users.push(user);
                pubsub.publish("userCreated", { userCreated : user })
                pubsub.publish("userCount", { userCount: database.users.length })
                return user
            },
            updateUser: (parent, { id, data }) => {
                const user = database.users.find((user) => parseInt(id) === parseInt(user.id))
                if (!user) {
                    throw new Error("User is not found");
                }
                if(data.userName) {
                    user.username = data.userName
                }
                if(data.email) {
                    user.email = data.email
                }
                pubsub.publish("userUpdated", { userUpdated : user })
                return user
            },
            deleteUser: (parent, { id }) => {
                const userIndex = database.users.findIndex((user) => parseInt(id) === parseInt(user.id))
                if (userIndex === -1) {
                    throw new Error("User not found.")
                }
                const deletedUser = database.users[userIndex]
                database.users.splice(userIndex, 1)
                pubsub.publish("userDeleted", { userDeleted : deletedUser })
                
                return deletedUser

            },
            deleteAllUsers: () => {
                const length = database.users.length
                database.users.splice(0, length)
                return {
                    count: length
                }

            },
            // EVENT MUTATİONS
            addEvent: (parent, { data: { title, desc, date, from, to, location_id, user_id } }) => {
                const event = {
                    id: nanoid(),
                    title: title,
                    desc: desc,
                    date: date,
                    from: from,
                    to: to,
                    location_id: location_id,
                    user_id: user_id
                };
                database.events.push(event);
                pubsub.publish("eventCreated", { eventCreated : event })
                return event
            },
            updateEvent: (parent, { id, data }) => {
                let selectedEvent = database.events.find((event) => parseInt(id) === parseInt(event.id))
                if (!selectedEvent) {
                    throw new Error("Event is not found")
                }
                selectedEvent.title = data.title
                selectedEvent.desc = data.desc
                selectedEvent.date = data.date
                selectedEvent.from = data.from
                selectedEvent.to = data.to
                selectedEvent.location_id = data.location_id
                selectedEvent.user_id = data.user_id
                pubsub.publish("eventUpdated", { eventUpdated : selectedEvent })
                return selectedEvent
            },
            deleteEvent: (parent, { id }) => {
                const eventIndex = database.events.findIndex((event) => parseInt(id) === parseInt(event.id))
                if (eventIndex === -1) {
                    throw new Error("Event is not found")
                }
                const deletedEvent = database.events[eventIndex]
                database.events.splice(eventIndex, 1)
                pubsub.publish("eventDeleted", { eventDeleted : deletedEvent })
                return deletedEvent
            },
            deleteAllEvents: () => {
                const length = database.events.length;
                database.events.splice(0, length)
                return {
                    count: length
                }
            },
            // LOCATİON MUTATİONS
            addLocation: (parent, { data }) => {
                const location = {
                    id: nanoid(),
                    name: data.name,
                    desc: data.desc,
                    lat: data.lat,
                    lng: data.lng
                }
                database.locations.push(location)
                pubsub.publish("locationCreated", { locationCreated : location })
                return location
            },
            updateLocation: (parent, { id, data }) => {
                const selectedLocation = database.locations.find((location) => parseInt(id) === parseInt(location.id))
                if (!selectedLocation) {
                    throw new Error("Location is not found")
                }
                selectedLocation.name = data.name
                selectedLocation.desc = data.desc
                selectedLocation.lat = data.lat
                selectedLocation.lng = data.lng
                pubsub.publish("locationUpdated", { locationUpdated : selectedLocation })
                return selectedLocation;
            },
            deleteLocation: (parent, { id }) => {
                const locationIndex = database.locations.findIndex((location) => parseInt(id) === parseInt(location.id))
                if (locationIndex === -1) {
                    throw new Error("Location is not found")
                }
                const deletedLocation = database.locations[locationIndex]
                database.locations.splice(locationIndex, 1)
                pubsub.publish("locationDeleted", { locationDeleted : deletedLocation })
                return deletedLocation
            },
            deleteAllLocations: () => {
                const length = database.locations.length
                database.locations.splice(0, length)
                return {
                    count: length
                }
            },
            // PARTİCİPANT MUTATİONS
            addParticipant: (parent, { data }) => {
                const participant = {
                    id: nanoid(),
                    user_id: data.user_id,
                    event_id: data.event_id
                }
                database.participants.push(participant)
                pubsub.publish("participantCreated", { participantCreated : participant })
                return participant
            },
            updateParticipant: (parent, { id, data }) => {
                const updatedParticipant = database.participants.find((participant) => parseInt(id) === parseInt(participant.id))
                if (!updatedParticipant) {
                    throw new Error("Participant is not found")
                }
                updatedParticipant.user_id = data.user_id
                updatedParticipant.event_id = data.event_id
                pubsub.publish("participantUpdated", { participantUpdated : updatedParticipant })
                return updatedParticipant
            },
            deleteParticipant: (parent, { id, data }) => {
                const participantIndex = database.participants.findIndex((participant) => parseInt(id) === parseInt(participant.id))
                if (participantIndex === -1) {
                    throw new Error("Participant is not found")
                }
                const deletedParticipant = database.participants[participantIndex]
                database.participants.splice(participantIndex, 1)
                pubsub.publish("participantDeleted", { participantDeleted : deletedParticipant })
                return deletedParticipant
            },
            deleteAllParticipants: () => {
                const length = database.participants.length;
                database.participants.splice(0, length)
                return {
                    count: length
                }
            }
        }
    },
    context: {
        pubsub
    },
})
    