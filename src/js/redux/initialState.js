/**
 * ./src/js/redux/initialState.js
 */

const state = {
    isFetching: false,
    isSendingComment: false,
    isClapping: false,
    isLoggedIn: true,
    lastFetch: 0,
    post_data: {
        posts: []
    },
    user_data: {}
};

export default state;
