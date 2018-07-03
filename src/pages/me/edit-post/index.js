import React from 'react';
import types from 'prop-types';
import { MainPage } from '../../../components/app';
import PageView from '../../../components/editorComponent';

export default class AdminPost extends React.Component {
    static async getInitialProps({ query }) {
        const post_id = query.id.split('-').pop();
        return {
            post_id
        };
    }
    render() {
        return (
            <MainPage
                loggedIn={this.props.loggedIn}
                render={() => <PageView post_id={this.props.post_id} />}
            />
        );
    }
}

AdminPost.propTypes = {
    loggedIn: types.bool.isRequired,
    post_id: types.string.isRequired
};
