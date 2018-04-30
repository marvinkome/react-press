/**
 * ./src/js/index.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import Express from 'express';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from './src/js/history';
import store from './src/js/redux/store';
import App from './src/components/app.js';

import 'materialize-css/dist/js/materialize.js';

import 'materialize-css/dist/css/materialize.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './src/style/index.css';

// const app = Express();
// const port = 3000;

// app.use('/static', Express.static('static'));
// app.listen(port);

// const handle
const elem = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

ReactDOM.render(
    elem,
    document.getElementById('root')
);