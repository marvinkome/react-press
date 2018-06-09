import initialState from '../initialState';
import * as constants from '../constants';
import * as admin from './adminRequests';
import * as auth from './authRequests';
import * as preRequest from './beforeRequest';
import * as fetch from './fetchRequests';
import * as post from './postRequests';
import * as socket from './socketReducers';

// Reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SEND_REQUEST:
        return preRequest.sendRequest(state);

    case constants.SEND_LOGIN_REQUEST:
        return preRequest.sendloginRequest(state);

    case constants.SEND_COMMENT:
        return preRequest.sendCommentRequest(state);

    case constants.SEND_CLAP:
        return preRequest.sendClapRequest(state);

    case constants.RECIEVE_ARTICLES:
        return fetch.recieveArticles(state, action.payload, action.cursor, action.hasNextPage);

    case constants.RECIEVE_MORE_ARTICLES:
        return fetch.recieveMoreArticles(
            state,
            action.payload,
            action.cursor,
            action.hasNextPage
        );

    case constants.RECIEVE_USER_PROFILE:
        return fetch.recieveUserProfileData(state, action.payload);

    case constants.LOGIN_USER:
        return auth.loginUser(state, action.payload);

    case constants.LOGOUT_USER:
        return auth.logoutUser(state, action.logout);

    case constants.RECIEVE_USER_DATA:
        return auth.recieveUserData(state, action.payload);

    case constants.REQUEST_TAG_FINISHED:
        return admin.requestTagsFinished(state, action.tag.data.createTag.post, action.post_id);

    case constants.REQUEST_POST_FINISHED:
        return admin.requestPostsFinished(state, action.post.data.createPost.post);

    case constants.REQUEST_EDIT_POST_FINISHED:
        return admin.requestEditPostFinished(
            state,
            action.post.data.updatePost.post,
            action.post_id
        );

    case constants.REQUEST_DELETE_POST_FINISHED:
        return admin.requestDeletePostFinished(state, action.post_id);

    case constants.REQUEST_USER_EDIT_FINISHED:
        return admin.requestUserEditFinished(state, action);

    case constants.REQUEST_COMMENT_FINISHED:
        return post.requestCommentFinished(
            state,
            action.post.data.createComment.post,
            action.comment,
            action.data
        );

    case constants.REQUEST_COMMENT_REPLY_FINISHED:
        return post.requestCommentReplyFinished(
            state,
            action.post.data.createCommentReply.post,
            action.commentReply,
            action.data
        );

    case constants.REQUEST_CLAP_FINISHED:
        return post.requestClapFinished(state, action.post.data.createClap.post, action.data);

    case constants.VIEW_PAGE:
        return post.requestViewPageFinished(
            state,
            action.post.data.viewPost.post,
            action.pageId
        );

    case constants.ON_NOTIFICATION:
        return socket.recieveNotifications(state, action.message);

    default:
        return state;
    }
};

export default rootReducer;
