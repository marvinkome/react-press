import React from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import { MainPage } from '../../components/app';
import Body from './view/index';
import './home.less';

export const Index = (props) => {
    return <MainPage loggedIn={props.loggedIn} render={() => <Body posts={props.posts} />} />;
};

Index.propTypes = {
    loggedIn: types.bool.isRequired,
    posts: types.array.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    cursor: state.cursor,
    hasMore: state.hasNextPage
});

export default connect(mapStateToProps)(Index);
