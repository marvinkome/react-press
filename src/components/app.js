/**
 * ./src/components/app
 */

import React, { Component } from 'react';
import type from 'prop-types';
import Loadable from 'react-loadable';

import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './helpers/privateRoute';

import { connect } from 'react-redux';
import { fetch_all_data, fetch_user_data } from '../js/redux/actions';

const mapDispatchToProps = dispatch => ({
    fetch_data: () => dispatch(fetch_all_data()),
    fetch_user: () => dispatch(fetch_user_data())
});

import { Err404 } from './helpers/errors';

const AsyncHome = Loadable({
    loader: () => import('./home'),
    loading() {
        return <p>App is loading</p>;
    }
});

const AsyncPost = Loadable({
    loader: () => import('./post'),
    loading() {
        return <p>App is loading</p>;
    }
});

const AsyncLogin = Loadable({
    loader: () => import('./login'),
    loading() {
        return <p>App is loading</p>;
    }
});

const AsyncAdmin = Loadable({
    loader: () => import('./admin'),
    loading() {
        return <p>App is loading</p>;
    }
});

const AsyncEditPost = Loadable({
    loader: () => import('./admin/edit-post'),
    loading() {
        return <p>App is loading</p>;
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true
        };
    }
    componentDidMount() {
        const sessionLogin = JSON.parse(
            localStorage.getItem('med-blog-logged-in')
        );
        const localLogin = sessionLogin != undefined && sessionLogin == true;

        if (localLogin) {
            this.props.fetch_user();
        }

        this.props.fetch_data().then(null, () =>
            this.setState({
                render: false
            })
        );
    }
    render() {
        if (this.state.render) {
            return (
                <Switch>
                    {/* Front end */}
                    <Route path="/" component={AsyncHome} exact />
                    <Route path="/post/:id" component={AsyncPost} exact />

                    {/* authentication */}
                    <Route path="/auth/:section" component={AsyncLogin} exact />

                    {/* Backend */}
                    {/* <Route path="*" component={Err404} exact/> */}
                    <PrivateRoute
                        path="/admin/:path"
                        component={AsyncAdmin}
                        exact
                    />
                    <PrivateRoute
                        path="/admin/edit-post/:id"
                        component={AsyncEditPost}
                        exact
                    />

                    <Route component={Err404} />
                </Switch>
            );
        } else {
            return <h5>Oops something went wrong</h5>;
        }
    }
}

App.propTypes = {
    fetch_data: type.func.isRequired,
    fetch_user: type.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(App));
