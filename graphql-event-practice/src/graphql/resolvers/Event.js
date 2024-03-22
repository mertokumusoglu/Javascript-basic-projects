const Event = {
    user: (parent,__, { db }) => {
        return db.users.find((user) => parseInt(parent.user_id) === parseInt(user.id))
    },
    location: (parent,__, { db }) => {
        return db.locations.find((location) => parseInt(location.id) === parseInt(parent.location_id))
    },
    participants: (parent,__, { db }) => {
        return db.participants.filter((participant) => parseInt(participant.event_id) === parseInt(parent.id))
    }
}
export default Event;