/**
 * ./src/components/helpers/privateRoute
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: PrivComponent, ...rest }) => {
    const sessionLogin = JSON.parse(localStorage.getItem('med-blog-logged-in'));
    const localLogin = sessionLogin != undefined && sessionLogin == true;
    return (
        <Route
            {...rest}
            render={(npprops) =>
                localLogin ? (
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
    component: PropTypes.func.isRequired
};

export default PrivateRoute;
