import pubsub from "../../pubsub.js";
const Subscription = {
    // User subscriptions
    userCreated: {
        subscribe: () => pubsub.asyncIterator('userCreated'),
        resolve: payload => payload.userCreated
    },
    userUpdated: {
        subscribe: () => pubsub.asyncIterator("userUpdated"),
        resolve: payload => payload.userUpdated
    },
    userDeleted: {
        subscribe: () => pubsub.asyncIterator("userDeleted"),
        resolve: payload => payload.userDeleted
    },
    userCount: {
        subscribe: () => pubsub.asyncIterator("userCount"),
        resolve: payload => payload.userCount
    },
    // Event subscriptions
    eventCreated: {
        subscribe: () => pubsub.asyncIterator('eventCreated'),
        resolve: payload => payload.eventCreated
    },
    eventUpdated: {
        subscribe: () => pubsub.asyncIterator("eventUpdated"),
        resolve: payload => payload.eventUpdated
    },
    eventDeleted: {
        subscribe: () => pubsub.asyncIterator("eventDeleted"),
        resolve: payload => payload.eventDeleted
    },
    // Location subscriptions
    locationCreated: {
        subscribe: () => pubsub.asyncIterator('locationCreated'),
        resolve: payload => payload.locationCreated
    },
    locationUpdated: {
        subscribe: () => pubsub.asyncIterator("locationUpdated"),
        resolve: payload => payload.locationUpdated
    },
    locationDeleted: {
        subscribe: () => pubsub.asyncIterator("locationDeleted"),
        resolve: payload => payload.locationDeleted
    },
    // Participant subscription
    participantCreated: {
        subscribe: () => pubsub.asyncIterator('participantCreated'),
        resolve: payload => payload.participantCreated
    },
    participantUpdated: {
        subscribe: () => pubsub.asyncIterator("participantUpdated"),
        resolve: payload => payload.participantUpdated
    },
    participantDeleted: {
        subscribe: () => pubsub.asyncIterator("participantDeleted"),
        resolve: payload => payload.participantDeleted
    },
};
export default Subscription;