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
    post_data: {
        posts: []
    },
    user_data: {},
    public_users: {
        users: []
    }
};

export default state;
