/**
 * ./src/js/index.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { AppLoading } from './src/components/helpers/preloader';

import 'materialize-css/dist/js/materialize.js';

import 'materialize-css/dist/css/materialize.min.css';
import('font-awesome/css/font-awesome.min.css');
import './src/style/index.css';

const AsyncApp = Loadable({
    loader: () => import('./src/components/app.js'),
    loading: AppLoading,
    timeout: 10000,
    delay: 300
});

ReactDOM.render(
    <AsyncApp/>,
    document.getElementById('root')
);