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

// Create middleware
const socketMiddleware = createSocketMiddleWare(socket);
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware, socketMiddleware)
);

export default store;
