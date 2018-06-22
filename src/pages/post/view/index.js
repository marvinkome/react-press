import React from 'react';
import types from 'prop-types';
import withTopbar from '../../../components/app';
import PostBody from './body';

export class PageBody extends React.Component {
    render() {
        return <PostBody post={this.props.post} />;
    }
}

PageBody.propTypes = {
    post: types.object
};

export default withTopbar(PageBody);
