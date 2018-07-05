import * as types from '../actionTypes';

export const recieveArticles = (res) => ({
    type: types.RECIEVE_ARTICLES,
    payload: res.data.allPost.edges,
    cursor: res.data.allPost.pageInfo.endCursor,
    hasNextPage: res.data.allPost.pageInfo.hasNextPage
});

export const recieveMoreArticles = (res) => ({
    type: types.RECIEVE_MORE_ARTICLES,
    payload: res.data.allPost.edges,
    cursor: res.data.allPost.pageInfo.endCursor,
    hasNextPage: res.data.allPost.pageInfo.hasNextPage
});

export const recieveUserProfile = (res) => ({
    type: types.RECIEVE_USER_PROFILE,
    payload: res.data.publicUser
});
