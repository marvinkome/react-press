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
    return (
        <Route
            {...rest}
            render={npprops =>
                isLoggedIn ? (
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
