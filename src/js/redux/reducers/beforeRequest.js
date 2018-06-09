import { updateObject } from './utils';

// Case reducers
// Before request is complete
export const sendRequest = (state) => {
    const isFetching = true;
    return updateObject(state, {
        isFetching
    });
};

export const sendloginRequest = (state) => {
    const isLoggingIn = true;
    return updateObject(state, {
        isLoggingIn
    });
};

export const sendCommentRequest = (state) => {
    const isSendingComment = true;
    return updateObject(state, {
        isSendingComment
    });
};

export const sendClapRequest = (state) => {
    const isClapping = true;
    return updateObject(state, {
        isClapping
    });
};
