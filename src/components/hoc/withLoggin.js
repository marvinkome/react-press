import React from 'react';
import types from 'prop-types';
import { Consumer } from '../../pages/_app';

const WithIsLoggedIn = (props) => (
    <Consumer>
        {loggedIn => props.render(loggedIn)}
    </Consumer>
);

WithIsLoggedIn.propTypes = {
    render: types.func.isRequired
};

export default WithIsLoggedIn;
