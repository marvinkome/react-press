import initialState from '../initialState';
import * as types from '../actionTypes';
import * as admin from './adminRequests';
import * as auth from './authRequests';
import * as preRequest from './beforeRequest';
import * as fetch from './fetchRequests';
import * as post from './postRequests';
import * as socket from './socketReducers';

// Reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.SEND_REQUEST:
        return preRequest.sendRequest(state);

    case types.SEND_LOGIN_REQUEST:
        return preRequest.sendloginRequest(state);

    case types.SEND_COMMENT:
        return preRequest.sendCommentRequest(state);

    case types.SEND_CLAP:
        return preRequest.sendClapRequest(state);

    case types.RECIEVE_ARTICLES:
        return fetch.recieveArticles(state, action.payload, action.cursor, action.hasNextPage);

    case types.RECIEVE_MORE_ARTICLES:
        return fetch.recieveMoreArticles(
            state,
            action.payload,
            action.cursor,
            action.hasNextPage
        );

    case types.RECIEVE_USER_PROFILE:
        return fetch.recieveUserProfileData(state, action.payload);

    case types.LOGIN_USER:
        return auth.loginUser(state, action.payload);

    case types.LOGOUT_USER:
        return auth.logoutUser(state, action.logout);

    case types.RECIEVE_USER_DATA:
        return auth.recieveUserData(state, action.payload);

    case types.REQUEST_TAG_FINISHED:
        return admin.requestTagsFinished(state, action.tag.data.createTag.post, action.post_id);

    case types.REQUEST_POST_FINISHED:
        return admin.requestPostsFinished(state, action.post.data.createPost.post);

    case types.REQUEST_EDIT_POST_FINISHED:
        return admin.requestEditPostFinished(
            state,
            action.post.data.updatePost.post,
            action.post_id
        );

    case types.REQUEST_DELETE_POST_FINISHED:
        return admin.requestDeletePostFinished(state, action.post_id);

    case types.REQUEST_USER_EDIT_FINISHED:
        return admin.requestUserEditFinished(state, action);

    case types.REQUEST_COMMENT_FINISHED:
        return post.requestCommentFinished(
            state,
            action.post.data.createComment.post,
            action.comment,
            action.data
        );

    case types.REQUEST_COMMENT_REPLY_FINISHED:
        return post.requestCommentReplyFinished(
            state,
            action.post.data.createCommentReply.post,
            action.commentReply,
            action.data
        );

    case types.REQUEST_CLAP_FINISHED:
        return post.requestClapFinished(state, action.post.data.createClap.post, action.data);

    case types.VIEW_PAGE:
        return post.requestViewPageFinished(
            state,
            action.post.data.viewPost.post,
            action.pageId
        );

    case types.ON_NOTIFICATION:
        return socket.recieveNotifications(state, action.message);

    default:
        return state;
    }
};

export default rootReducer;
