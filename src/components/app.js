import React from 'react';
import types from 'prop-types';
import Topbar from './topbar';

export class MainPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Topbar isLoggedIn={this.props.loggedIn} />
                {this.props.render()}
            </React.Fragment>
        );
    }
}

MainPage.propTypes = {
    loggedIn: types.bool.isRequired,
    render: types.func.isRequired
};

export const withTopbar = (Page) => {
    const Wrapper = (props) => {
        return (
            <div>
                <Topbar isLoggedIn={false} />
                <Page {...props} />
            </div>
        );
    };

    Wrapper.propTypes = {
        loggedIn: types.bool
    };

    return Wrapper;
};

export default withTopbar;
