import React from 'react';
import Head from 'next/head';
import types from 'prop-types';
import Topbar from './topbar';

export default class MainPage extends React.Component {
    render() {
        const defaultDescription = `
            Blogly is a basic blogging platform for readers and publishers. 
            Read, Create posts, comment and like your favourite posts.
        `;

        return (
            <React.Fragment>
                <Head>
                    <title>{this.props.pageTitle} - Blogly</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, viewport-fit=cover"
                    />
                    <meta name="author" content="Marvin Kome" />
                    <meta
                        name="description"
                        content={this.props.pageDescription || defaultDescription}
                    />
                </Head>
                <Topbar isLoggedIn={this.props.loggedIn} />
                {this.props.render()}
            </React.Fragment>
        );
    }
}

MainPage.propTypes = {
    loggedIn: types.bool.isRequired,
    render: types.func.isRequired,
    pageTitle: types.string.isRequired,
    pageDescription: types.string
};
