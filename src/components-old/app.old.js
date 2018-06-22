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

// Helpers
import { isLoggedIn } from '../js/helpers';
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

const AsyncProfilePage = Loadable({
    loader: () => import('./profile-page'),
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true
        };
    }
    async componentDidMount() {
        if (isLoggedIn()) {
            const res = await this.props.fetch_user();
            if (res && res.payload) {
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
            }
        }

        try {
            await this.props.fetch_data();
        } catch (e) {
            this.setState({
                render: false
            });
        }
    }
    render_routes = () => (
        <Switch>
            {/* Front end */}
            <Route path="/" component={AsyncHome} exact />
            <Route path="/post/:id" component={AsyncPost} exact />
            <Route path="/profile/:username" component={AsyncProfilePage} exact />

            {/* authentication */}
            <Route path="/auth/:section" component={AsyncLogin} exact />

            {/* Backend */}
            <PrivateRoute path="/admin/:path" component={AsyncAdmin} exact />
            <PrivateRoute path="/admin/edit-post/:id" component={AsyncEditPost} exact />

            <Route component={Err404} />
        </Switch>
    );
    render() {
        return this.state.render ? this.render_routes() : <h5>Oops something went wrong</h5>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetch_data: () => dispatch(fetch_all_data()),
    fetch_user: () => dispatch(fetch_user_data())
});

export const ConnectApp = withRouter(connect(null, mapDispatchToProps)(App));

App.propTypes = {
    fetch_data: type.func.isRequired,
    fetch_user: type.func.isRequired
};

const Main = () => (
    <Provider store={store}>
        <Router history={history}>
            <ConnectApp />
        </Router>
    </Provider>
);

export default Main;
