import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import { MainPage } from '../../../components/app';
import PageView from '../../../components/editorComponent';
import { createToast, isLoggedIn } from '../../../lib/helpers';

export default class AdminEditPost extends React.Component {
    static async getInitialProps({ query, isServer, res, req }) {
        if (isServer) {
            if (isLoggedIn(req) === false) {
                const backURL = '/login';
                res.writeHead(302, {
                    Location: backURL
                });
                res.end();
                res.finished = true;
            }
        } else {
            if (isLoggedIn() === false) {
                Router.back();
                createToast('You\'re already logged in');
            }
        }

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

AdminEditPost.propTypes = {
    loggedIn: types.bool.isRequired,
    post_id: types.string.isRequired
};
