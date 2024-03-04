const { parse } = require("graphql");
const database = require("./data.json")
const { ApolloServer, gql } = require("apollo-server");
(async () => {
    const { nanoid } = await import('nanoid');
    
    const typeDefs = gql`
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
        location_id: ID!
        user_id: ID!
        user: User!
        location: Location!
        participants: [Participant!]
    }
    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: Int!
        lng: Int!
    }
    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
        user: User!
        event: Event!
    }
    type Query {
        # User
        users: [User!]!
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
        updateUser(id: ID!,data: updateUserInput!): User!
        # Event
        addEvent(title: String!, desc: String!, date: String!, from: String!, to: String!, location_id: ID!,user_id: ID!): Event!
    }
`;

const resolvers = {
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
        location: (parent,args) => {
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
        addUser: (parent, { data: {userName, email} }) => {
            const user = {
                id: nanoid(),
                username: userName,
                email: email,
                
            };
            database.users.push(user);
            return user
        },
        updateUser: (parent, {id, data}) => {
            /* O(4n)
            const userIndex = database.users.findIndex((user) => parseInt(id) === parseInt(user.id))
            if(userIndex === -1) {
                throw new Error("user is not found");
            }
            database.users[userIndex].username = data.userName;
            database.users[userIndex].email = data.email
            return database.users[userIndex]
            */
           // O(n)
            const user = database.users.find((user) => parseInt(id) === parseInt(user.id))
            if(user === -1 ) {
                throw new Error("User not found");
            }
            user.username = data.userName
            user.email = data.email
            return user
        },
        // EVENT MUTATİONS
        addEvent: (parent, {title, desc, date, from, to, location_id ,user_id}) => {
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
            return event
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
server.listen().then(({url}) => {
    console.log(`server is ready at ${url}`);
});
  })();