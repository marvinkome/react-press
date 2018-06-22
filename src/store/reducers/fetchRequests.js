import { updateObject, removeDuplicateInArray } from './utils';

export const recieveArticles = (state, articles, cursor, hasNextPage) => {
    const isFetching = false;
    const lastFetch = Date.now();

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        cursor,
        hasNextPage,
        post_data: updateObject(state.post_data, {
            posts: articles
        })
    });

    return store;
};

export const recieveMoreArticles = (state, articles, cursor, hasNextPage) => {
    const isFetching = false;
    const lastFetch = Date.now();

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        cursor,
        hasNextPage,
        post_data: updateObject(state.post_data, {
            posts: state.post_data.posts.concat(articles)
        })
    });

    return store;
};

export const recieveUserProfileData = (state, profile_data) => {
    if (profile_data == null) {
        return state;
    }
    const isFetching = false;
    const lastFetch = Date.now();

    removeDuplicateInArray('id', state.public_users.users, profile_data.id);

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        public_users: updateObject(state.public_users, {
            users: state.public_users.users.concat(profile_data)
        })
    });

    return store;
};
