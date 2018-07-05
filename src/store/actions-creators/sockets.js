import * as types from '../actionTypes';

export const setupNotification = (token) => ({
    type: types.SETUP_NOTIFICATION,
    token
});

export const onNotification = (message) => ({
    type: types.ON_NOTIFICATION,
    message
});

export const readAllNotifications = () => ({
    type: types.READ_ALL_NOTIFICATIONS
});
