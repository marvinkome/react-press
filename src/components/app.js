/**
 * ./src/components/app
 */

import React, { Component } from 'react';
import type from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './helpers/privateRoute';
import { connect } from 'react-redux';
import { fetch_all_data, fetch_user_data } from '../js/redux/actions';

const mapStateToProps = state => ({
    loggedIn: state.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    fetch_data: () => dispatch(fetch_all_data()),
    fetch_user: () => dispatch(fetch_user_data())
});

import Home from './home';
import Post from './post';
import Login from './login';
import Admin, { EditPost } from './admin';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true
        };
    }
    componentDidMount() {
        this.props.fetch_data().then(null, () =>
            this.setState({
                render: false
            })
        );

        if (this.props.loggedIn) {
            this.props.fetch_user();
        }
    }
    render() {
        if (this.state.render) {
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
        } else {
            return <h5>Oops something went wrong</h5>;
        }
    }
}

App.propTypes = {
    fetch_data: type.func.isRequired,
    fetch_user: type.func.isRequired,
    loggedIn: type.bool.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
