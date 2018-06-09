import { onNotification } from './actions';
import { LOGOUT_USER, RECIEVE_USER_DATA, READ_ALL_NOTIFICATIONS } from './constants';
import { getFromStore } from '../storage';

export const createSocketMiddleWare = (socket) => (state) => {
    return (next) => (action) => {
        // when dispatching a redux action
        // check if its a login action then disconnect the user
        if (action.type == LOGOUT_USER) {
            if (socket !== null && socket !== undefined) socket.disconnect();
        }

        // Check if its getting user profile then connect socket.
        // This partly guarantees that token is defined
        if (action.type == RECIEVE_USER_DATA) {
            // Get token from store. User should already be loggedIn
            const token = getFromStore('med-blog-ref');

            // Connect the socket
            socket.connect(token);

            // Dispatch notification when it recieves and action from the server
            socket.recieve_notification((message) => {
                state.dispatch(onNotification(message));
            });
        }

        // Check if its a read all notificions action
        if( action.type == READ_ALL_NOTIFICATIONS ) {
            // Emit read notifications event to server
            // This will trigger another notification action
            socket.read_all_notifications();
        }

        return next(action);
    };
};
