/**
 * ./src/components/app
 */

// React
import React, { Component } from 'react';

// Proptypes
import type from 'prop-types';

// Loadable
import Loadable from 'react-loadable';

// React Router v4
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import history from '../js/history';
import PrivateRoute from './helpers/privateRoute'; // HOC to protect routes

// Redux
import store from '../js/redux/store';
import { fetch_all_data, fetch_user_data } from '../js/redux/actions';

// React redux
import { Provider, connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    fetch_data: () => dispatch(fetch_all_data()),
    fetch_user: () => dispatch(fetch_user_data())
});

import { Err404 } from './helpers/errors';
import { AppLoading } from './helpers/preloader';

const AsyncHome = Loadable({
    loader: () => import('./home'),
    loading: AppLoading,
    timeout: 10000,
    delay: 300
});

const AsyncPost = Loadable({
    loader: () => import('./post'),
    loading: AppLoading,
    timeout: 10000,
    delay: 300
});

const AsyncLogin = Loadable({
    loader: () => import('./login'),
    loading: AppLoading,
    timeout: 10000,
    delay: 300
});

const AsyncAdmin = Loadable({
    loader: () => import('./admin'),
    loading: AppLoading,
    timeout: 10000,
    delay: 300
});

const AsyncEditPost = Loadable({
    loader: () => import('./admin/edit-post'),
    loading: AppLoading,
    timeout: 10000,
    delay: 300
});

const SwitchRoutes = () => (
    <Switch>
        {/* Front end */}
        <Route path="/" component={AsyncHome} exact />
        <Route path="/post/:id" component={AsyncPost} exact />

        {/* authentication */}
        <Route path="/auth/:section" component={AsyncLogin} exact />

        {/* Backend */}
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
        const localLogin =
            sessionLogin != undefined && sessionLogin == true;

        if (localLogin) {
            this.props.fetch_user().then((res) => {
                if (res.payload.msg == 'Not enough segments') {
                    const toastHTML = `
                            <div>
                                <span>Session expired please login</span>
                            </div>
                        `;
                    window.M.toast({
                        html: toastHTML,
                        displayLength: 4000
                    });
                    localStorage.setItem('med-blog-logged-in', false);
                    localStorage.removeItem('med-blog-ref');
                    history.push('/auth/login');
                }
            });
        }

        this.props.fetch_data().then(null, () =>
            this.setState({
                render: false
            })
        );
    }
    render() {
        return this.state.render ? (
            <SwitchRoutes />
        ) : (
            <h5>Oops something went wrong</h5>
        );
    }
}

const ConnectApp = withRouter(connect(null, mapDispatchToProps)(App));

const Main = () => (
    <Provider store={store}>
        <Router history={history}>
            <ConnectApp />
        </Router>
    </Provider>
);

App.propTypes = {
    fetch_data: type.func.isRequired,
    fetch_user: type.func.isRequired
};

export default Main;
