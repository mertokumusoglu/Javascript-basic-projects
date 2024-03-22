export const Participant =  {
    user: (parent,__,{ db }) => {
        return db.users.find((user) => parseInt(user.id) === parseInt(parent.user_id))
    },
    event: (parent,__,{ db }) => {
        return db.events.find((event) => parseInt(event.id) === parseInt(parent.event_id))
    }
}
export default Participant;