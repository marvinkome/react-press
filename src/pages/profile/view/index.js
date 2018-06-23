import React from 'react';
import types from 'prop-types';
import withTopbar from '../../../components/app';
import Error from '../../../components/error';

import AuthorInfo from './author-info';
import UserPosts from './user-posts';

export class PageView extends React.Component {
    render() {
        if (this.props.user === undefined) {
            return (
                <Error
                    render={
                        <div>
                            <h5 className="center">User not found</h5>
                        </div>
                    }
                />
            );
        } else {
            return (
                <div className="page-body section container">
                    <div className="row">
                        <div className="col s12">
                            <div>
                                <AuthorInfo data={this.props.user} />
                                <UserPosts data={this.props.user} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

PageView.propTypes = {
    user: types.object
};

export default withTopbar(PageView);
