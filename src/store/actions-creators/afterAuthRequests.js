import * as types from '../actionTypes';

export const recieveUserData = (payload, token) => ({
    type: types.RECIEVE_USER_DATA,
    token,
    payload
});

export const loginUser = (payload) => ({
    type: types.LOGIN_USER,
    payload
});

export const logoutUser = () => ({
    type: types.LOGOUT_USER,
    logout: true
});