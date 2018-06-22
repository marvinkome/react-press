import * as types from '../actionTypes';

export const recieveUserData = (payload) => ({
    type: types.RECIEVE_USER_DATA,
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