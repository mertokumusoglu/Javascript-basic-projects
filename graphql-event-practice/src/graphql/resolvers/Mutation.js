import {nanoid} from "nanoid";

const Mutation = {
    // USER MUTATİONS
    addUser: (parent, { data: { userName, email } }, { db }) => {
        const user = {
            id: nanoid(),
            username: userName,
            email: email,
        };
        db.users.push(user);
        pubsub.publish("userCreated", { userCreated : user })
        pubsub.publish("userCount", { userCount: db.users.length })
        return user
    },
    updateUser: (parent, { id, data }, { db }) => {
        const user = db.users.find((user) => parseInt(id) === parseInt(user.id))
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
    deleteUser: (parent, { id }, { db }) => {
        const userIndex = db.users.findIndex((user) => parseInt(id) === parseInt(user.id))
        if (userIndex === -1) {
            throw new Error("User not found.")
        }
        const deletedUser = db.users[userIndex]
        db.users.splice(userIndex, 1)
        pubsub.publish("userDeleted", { userDeleted : deletedUser })
        
        return deletedUser

    },
    deleteAllUsers: (_,__,{ db }) => {
        const length = db.users.length
        db.users.splice(0, length)
        return {
            count: length
        }

    },
    // EVENT MUTATİONS
    addEvent: (parent, { data: { title, desc, date, from, to, location_id, user_id } },{ db }) => {
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
        db.events.push(event);
        pubsub.publish("eventCreated", { eventCreated : event })
        return event
    },
    updateEvent: (parent, { id, data },{ db }) => {
        let selectedEvent = db.events.find((event) => parseInt(id) === parseInt(event.id))
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
    deleteEvent: (parent, { id },{ db }) => {
        const eventIndex = db.events.findIndex((event) => parseInt(id) === parseInt(event.id))
        if (eventIndex === -1) {
            throw new Error("Event is not found")
        }
        const deletedEvent = db.events[eventIndex]
        db.events.splice(eventIndex, 1)
        pubsub.publish("eventDeleted", { eventDeleted : deletedEvent })
        return deletedEvent
    },
    deleteAllEvents: (_,__,{ db }) => {
        const length = db.events.length;
        db.events.splice(0, length)
        return {
            count: length
        }
    },
    // LOCATİON MUTATİONS
    addLocation: (parent, { data },{ db }) => {
        const location = {
            id: nanoid(),
            name: data.name,
            desc: data.desc,
            lat: data.lat,
            lng: data.lng
        }
        db.locations.push(location)
        pubsub.publish("locationCreated", { locationCreated : location })
        return location
    },
    updateLocation: (parent, { id, data },{ db }) => {
        const selectedLocation = db.locations.find((location) => parseInt(id) === parseInt(location.id))
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
    deleteLocation: (parent, { id },{ db }) => {
        const locationIndex = db.locations.findIndex((location) => parseInt(id) === parseInt(location.id))
        if (locationIndex === -1) {
            throw new Error("Location is not found")
        }
        const deletedLocation = db.locations[locationIndex]
        db.locations.splice(locationIndex, 1)
        pubsub.publish("locationDeleted", { locationDeleted : deletedLocation })
        return deletedLocation
    },
    deleteAllLocations: (_,__,{ db }) => {
        const length = db.locations.length
        db.locations.splice(0, length)
        return {
            count: length
        }
    },
    // PARTİCİPANT MUTATİONS
    addParticipant: (parent, { data },{ db }) => {
        const participant = {
            id: nanoid(),
            user_id: data.user_id,
            event_id: data.event_id
        }
        db.participants.push(participant)
        pubsub.publish("participantCreated", { participantCreated : participant })
        return participant
    },
    updateParticipant: (parent, { id, data },{ db }) => {
        const updatedParticipant = db.participants.find((participant) => parseInt(id) === parseInt(participant.id))
        if (!updatedParticipant) {
            throw new Error("Participant is not found")
        }
        updatedParticipant.user_id = data.user_id
        updatedParticipant.event_id = data.event_id
        pubsub.publish("participantUpdated", { participantUpdated : updatedParticipant })
        return updatedParticipant
    },
    deleteParticipant: (parent, { id, data },{ db }) => {
        const participantIndex = db.participants.findIndex((participant) => parseInt(id) === parseInt(participant.id))
        if (participantIndex === -1) {
            throw new Error("Participant is not found")
        }
        const deletedParticipant = db.participants[participantIndex]
        db.participants.splice(participantIndex, 1)
        pubsub.publish("participantDeleted", { participantDeleted : deletedParticipant })
        return deletedParticipant
    },
    deleteAllParticipants: (_,__,{ db }) => {
        const length = db.participants.length;
        db.participants.splice(0, length)
        return {
            count: length
        }
    }
};
export default Mutation;
