/**
 * ./src/components/app
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Post from './post';

const App = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/post/:id" component={Post} exact />
        </Switch>
    );
};
export default App;
