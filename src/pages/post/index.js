import React, { Component } from 'react';
import types from 'prop-types';
import Router from 'next/router';

import MainPage from '../../components/app';
import Error from '../../components/error';
// import PageBody from './view';
import './style.less';

export class Post extends Component {
    static async getInitialProps({ query }) {
        query = decodeURIComponent(query.id);
        const post_data = query.split('-');
        const post_id = post_data.pop();
        const post_name = post_data.join('-');
        return {
            post_id,
            post_name
        };
    }
    renderError = () => {
        return (
            <Error
                render={
                    <div className="center">
                        <div className="center-align">
                            <img className="responsive-img" src="/static/404.png" />
                        </div>
                        <h5 className="center">
                            The content you{'\''}re looking for is currently not available
                        </h5>
                        <a onClick={() => Router.back()}>Go back to the previous page</a>
                    </div>
                }
            />
        );
    };
    render() {
        return (
            // <MainPage
            //     loggedIn={this.props.loggedIn}
            //     pageTitle={post !== undefined ? post.node.title : 'Post not found'}
            //     render={() =>
            //         post !== undefined ? (
            //             <PageBody post={post} loggedIn={this.props.loggedIn} />
            //         ) : (
            //             this.renderError()
            //         )
            //     }
            // />

            <MainPage
                loggedIn={this.props.loggedIn}
                pageTitle={'Post Page'}
                render={() => <p>Hello World</p>}
            />
        );
    }
}

Post.propTypes = {
    loggedIn: types.bool.isRequired,
    post_id: types.string.isRequired,
    post_name: types.string.isRequired
};

export default Post;
