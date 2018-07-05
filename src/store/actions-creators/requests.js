// Request sync actions
import * as types from '../actionTypes';

export const sendRequest = () => ({
    type: types.SEND_REQUEST
});

export const sendLoginRequest = () => ({
    type: types.SEND_LOGIN_REQUEST
});

export const sendComment = () => ({
    type: types.SEND_COMMENT
});

export const sendClap = () => ({
    type: types.SEND_CLAP
});
