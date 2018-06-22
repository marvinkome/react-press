/**
 * ./src/js/redux/initialState.js
 */

const state = {
    isFetching: false,
    isSendingComment: false,
    isClapping: false,
    isLoggingIn: false,
    lastFetch: 0,
    cursor: '',
    user_data: {},
    public_users: {
        users: []
    },
    post_data: {
        posts: []
    },
    notifications_data: {
        notifications: [],
        unread_count: 0
    }
};

export default state;
