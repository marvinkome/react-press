/**
 * ./src/components/helpers/privateRoute
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const PrivateRoute = ({ component: PrivComponent, isLoggedIn, ...rest }) => {
    const sessionLogin = JSON.parse(localStorage.getItem('med-blog-logged-in'));
    const localLogin = sessionLogin != undefined && sessionLogin == true;
    return (
        <Route
            {...rest}
            render={npprops =>
                isLoggedIn || localLogin ? (
                    <PrivComponent {...npprops} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: { from: npprops.location }
                        }}
                    />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
