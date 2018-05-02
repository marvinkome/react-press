/**
 * ./src/js/index.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { AppLoading } from './src/components/helpers/preloader';
import 'materialize-css/dist/css/materialize.min.css';
import firebase from 'firebase';
import './src/style/index.css';

import('materialize-css/dist/js/materialize.js');

const config = {
    apiKey: process.env.FIREBASE_AUTH,
    authDomain: 'reactpress-48581.firebaseapp.com',
    databaseURL: 'https://reactpress-48581.firebaseio.com',
    projectId: 'reactpress-48581',
    storageBucket: 'reactpress-48581.appspot.com',
    messagingSenderId: process.env.FIREBASE_MESSAGING
};
     
firebase.initializeApp(config);

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