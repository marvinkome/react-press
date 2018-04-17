/**
 * ./src/components/app
 */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './home';
import Post from './post';
import { Dashboard, Posts } from './admin';

const App = () => {
    return (
        <Switch>
            {/* Front end */}
            <Route path="/" component={Home} exact />
            <Route path="/post/:id" component={Post} exact />

            {/* Backend */}
            <Route path="/admin/dashboard" component={Dashboard} exact />
            <Route path="/admin/posts" component={Posts} exact />
            <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
    );
};
export default App;
