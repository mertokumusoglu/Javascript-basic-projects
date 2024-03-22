
//Query.js
const Query = {
    users: (_,__, { db }) => db.users,
    user: (parent, args, {db}) => {
        return db.users.find((user) => user.id === parseInt(args.id))
    },
    events: (_,__, { db }) => db.events,
    event: (parent, args, { db }) => {
        return db.events.find((event) => event.id === parseInt(args.id))
    },
    locations: (_,__, { db }) => db.locations,
    location: (parent, args, { db }) => {
        return db.locations.find((location) => parseInt(args.id) === parseInt(location.id))
    },
    participants: (_,__, { db }) => db.participants,
    participant: (parent, args, { db }) => {
        return db.participants.find((participant) => parseInt(args.id) === parseInt(participant.id))
    }
}
export default Query;
