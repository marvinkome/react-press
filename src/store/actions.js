/**
 * ./src/js/redux/actions.js
 */

import { getFromStore } from '../lib/storage';
import { tokenKey } from '../keys/storage';
import queryRequest from '../api/queryRequest';
import userRequest from '../api/userRequest';
import authRequest from '../api/authRequests';
import * as creators from './actions-creators';
import * as query from './graphql/queries';
import * as mutations from './graphql/mutations';

/**
 * Redux async Thunks
 */

// Query Actions
export const fetch_all_data = () => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const data = await queryRequest(query.fetch_query);
        return await dispatch(creators.recieveArticles(data));
    };
};

export const fetch_more_data = (cursor) => {
    return async (dispatch) => {
        const data = await queryRequest(query.fetch_more(cursor));
        return await dispatch(creators.recieveMoreArticles(data));
    };
};

export const fetch_user_data = (refresh_token) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const data = await userRequest(query.fetch_user_data_query, refresh_token);
        return await dispatch(creators.recieveUserData(data, refresh_token));
    };
};

export const fetch_profile_data = (username) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const data = await queryRequest(query.fetch_profile_query(username));
        return await dispatch(creators.recieveUserProfile(data));
    };
};

// Auth Actions
export const login_user = (user_data) => {
    return async (dispatch) => {
        dispatch(creators.sendLoginRequest());

        const data = await authRequest(user_data).login;
        return await dispatch(creators.loginUser(data));
    };
};

export const register_user = (user_data) => {
    return async (dispatch) => {
        dispatch(creators.sendLoginRequest());

        const data = await authRequest(user_data).register;
        return await dispatch(creators.loginUser(data));
    };
};

// Mutatons Actions
export const create_tags = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const r_token = getFromStore(tokenKey);
        const res = await userRequest(mutations.create_tag(data.tag_name, data.post_id), r_token);
        return await dispatch(creators.requestCreateTagsFinished(res, data));
    };
};

export const create_posts = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const r_token = getFromStore(tokenKey);
        const res = await userRequest(mutations.create_post(data), r_token);
        return await dispatch(creators.requestCreatePostsFinished(res));
    };
};

export const edit_post = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const r_token = getFromStore(tokenKey);
        const res = await userRequest(mutations.edit_post(data), r_token);
        return await dispatch(creators.requestEditPostFinished(res, data));
    };
};

export const delete_post = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const r_token = getFromStore(tokenKey);
        await userRequest(mutations.delete_post(data), r_token);
        return await dispatch(creators.requestDeletePostFinished(data));
    };
};

export const update_profile_pic = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const r_token = getFromStore(tokenKey);
        await userRequest(mutations.update_profile_picture(data.pic_url, data.user_id), r_token);
        return await dispatch(creators.requestUpdateUserFinished());
    };
};

export const update_user_info = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendRequest());

        const r_token = getFromStore(tokenKey);
        await userRequest(mutations.update_info(data), r_token);
        return await dispatch(creators.requestUpdateUserFinished());
    };
};

export const addComment = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendComment());

        const r_token = getFromStore(tokenKey);
        const res = await userRequest(mutations.create_comment(data), r_token);
        return await dispatch(creators.requestCommentFinished(res, data));
    };
};

export const replyComment = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendComment());

        const r_token = getFromStore(tokenKey);
        const res = await userRequest(mutations.create_comment_reply(data), r_token);
        return await dispatch(creators.requestCommentReplyFinished(res, data));
    };
};

export const clap = (data) => {
    return async (dispatch) => {
        dispatch(creators.sendClap());

        const r_token = getFromStore(tokenKey);
        const res = await userRequest(mutations.clap(data), r_token);
        return await dispatch(creators.requestClapFinished(res, data));
    };
};

export const viewPage = (pageId) => {
    return async (dispatch) => {
        const res = await queryRequest(mutations.viewPage(pageId));
        return await dispatch(creators.requestViewPageFinished(res, pageId));
    };
};
