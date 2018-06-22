import * as types from '../actionTypes';

export const requestCommentFinished = (res, data) => ({
    type: types.REQUEST_COMMENT_FINISHED,
    post: res,
    comment: res.data.createComment.comment,
    data
});

export const requestCommentReplyFinished = (res, data) => ({
    type: types.REQUEST_COMMENT_REPLY_FINISHED,
    post: res,
    commentReply: res.data.createCommentReply.commentReply,
    data
});

export const requestClapFinished = (res, data) => ({
    type: types.REQUEST_CLAP_FINISHED,
    post: res,
    data
});

export const requestViewPageFinished = (res, pageId) => ({
    type: types.VIEW_PAGE,
    post: res,
    pageId
});