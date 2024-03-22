const User =  {
    events: (parent, __, { db }) => {
        return db.events.filter((event) => parseInt(parent.id) === parseInt(event.user_id))
    }
}
export default User;