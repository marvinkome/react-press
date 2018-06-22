import { updateObject } from './utils';

export const recieveNotifications = (state, message) => {
    const notifications_data = updateObject(state.notifications_data, {
        notifications: message.notifications,
        unread_count: message.unread_count
    });

    const store = updateObject(state, {
        notifications_data
    });

    return store;
};
