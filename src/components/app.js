/**
 * ./src/components/app
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './helpers/privateRoute';

import Home from './home';
import Post from './post';
import Login from './login';
import Admin, { EditPost } from './admin';

const App = () => {
    return (
        <Switch>
            {/* Front end */}
            <Route path="/" component={Home} exact />
            <Route path="/post/:id" component={Post} exact />

            {/* authentication */}
            <Route path="/auth/:section" component={Login} exact />

            {/* Backend */}
            <PrivateRoute path="/admin/:path" component={Admin} exact />
            <PrivateRoute
                path="/admin/edit-post/:id"
                component={EditPost}
                exact
            />
        </Switch>
    );
};
export default App;
