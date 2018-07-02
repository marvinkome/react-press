import { onNotification } from './actions-creators';
import { LOGOUT_USER, READ_ALL_NOTIFICATIONS, SETUP_NOTIFICATION } from './actionTypes';

export const createSocketMiddleWare = (socket) => (state) => {
    return (next) => (action) => {
        // when dispatching a redux action
        // check if its a logout action then disconnect the user
        if (action.type == LOGOUT_USER) {
            if (socket !== null && socket !== undefined) socket.disconnect();
        }

        // Check if its getting user profile then connect socket.
        // This partly guarantees that token is defined
        if (action.type == SETUP_NOTIFICATION) {
            // Get token from store. User should already be loggedIn
            const token = action.token;

            // Connect the socket
            socket.connect(token);

            // Dispatch notification when it recieves an action from the server
            socket.recieve_notification((message) => {
                state.dispatch(onNotification(message));
            });
        }

        // Check if its a read all notificions action
        if (action.type == READ_ALL_NOTIFICATIONS) {
            // Emit read notifications event to server
            // This will trigger another notification action
            socket.read_all_notifications();
        }

        return next(action);
    };
};
