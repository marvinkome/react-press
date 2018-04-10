/**
 * ./src/js/index.js
 */

import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/js/materialize.js';

import 'materialize-css/dist/css/materialize.min.css';
import 'font-awesome/css/font-awesome.min.css';

const elem = (
    <p>Hello World</p>
);

ReactDOM.render(
    elem,
    document.getElementById('root')
);