import * as types from '../actionTypes';

export const requestCreateTagsFinished = (tag, data) => ({
    type: types.REQUEST_TAG_FINISHED,
    post_id: data.post_id,
    tag: tag
});

export const requestCreatePostsFinished = (post) => ({
    type: types.REQUEST_POST_FINISHED,
    post: post
});

export const requestEditPostFinished = (post, data) => ({
    type: types.REQUEST_EDIT_POST_FINISHED,
    post: post,
    post_id: data.postId
});

export const requestDeletePostFinished = (data) => ({
    type: types.REQUEST_DELETE_POST_FINISHED,
    post_id: data
});

export const requestUpdateUserFinished = () => ({
    type: types.REQUEST_USER_EDIT_FINISHED
});