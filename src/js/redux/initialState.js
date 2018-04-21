/**
 * ./src/js/redux/initialState.js
 */

const state = {
    isFetching: false,
    isLoggedIn: true,
    lastFetch: 0,
    post_data: {
        posts: []
    },
    user_data: {}
};

export default state;
