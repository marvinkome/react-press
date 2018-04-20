/**
 * ./src/components/app
 */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './helpers/privateRoute';

import Home from './home';
import Post from './post';
import Login from './login';
import { Dashboard, Posts, NewPost, EditPost, EditProfile } from './admin';

const App = () => {
    return (
        <Switch>
            {/* Front end */}
            <Route path="/" component={Home} exact />
            <Route path="/post/:id" component={Post} exact />

            {/* authentication */}
            <Route path="/auth/:section" component={Login} exact />

            {/* Backend */}
            <PrivateRoute path="/admin/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/admin/posts" component={Posts} exact />
            <PrivateRoute path="/admin/new-post" component={NewPost} exact />
            <PrivateRoute
                path="/admin/edit-post/:id"
                component={EditPost}
                exact
            />
            <PrivateRoute
                path="/admin/edit-profile"
                component={EditProfile}
                exact
            />
            <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
    );
};
export default App;
