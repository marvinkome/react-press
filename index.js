/**
 * ./src/js/index.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import history from './src/history';
import App from './src/components/app.js';

import 'materialize-css/dist/js/materialize.js';

import 'materialize-css/dist/css/materialize.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './src/style/index.css';

const elem = (
    <Router history={history}>
        <App/>
    </Router>
);

ReactDOM.render(
    elem,
    document.getElementById('root')
);