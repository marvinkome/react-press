/**
 * ./src/js/redux/store.js
 */

import { createStore, applyMiddleware } from 'redux';
import { createSocketMiddleWare } from './middleWare';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import Socket from '../socketio';

// Initialize socket
let socket = Socket();

const logger = store => next => action => {
    console.log('dispatching', action); // eslint-disable-line
    let result = next(action);
    console.log('next state', store.getState()); // eslint-disable-line
    return result;
};

// Create middleware
const socketMiddleware = createSocketMiddleWare(socket);
export default (state) => createStore(
    rootReducer,
    state,
    applyMiddleware(thunkMiddleware, socketMiddleware, logger)
);
