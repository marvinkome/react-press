import React from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import { MainPage } from '../../components/app';
import { fetch_more_data } from '../../store/actions';
import Body from './view/index';
import './home.less';

export const Index = (props) => {
    const fetch_more = () => {
        if (props.posts.length > 0 && props.cursor !== '' && props.hasMore) {
            props.fetch_more(props.cursor);
        }
    };
    return (
        <MainPage
            loggedIn={props.loggedIn}
            render={() => <Body posts={props.posts} fetch_more={fetch_more} />}
        />
    );
};

Index.propTypes = {
    loggedIn: types.bool.isRequired,
    posts: types.array.isRequired,
    cursor: types.string.isRequired,
    hasMore: types.bool.isRequired,
    fetch_more: types.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    cursor: state.cursor,
    hasMore: state.hasNextPage
});

const mapDispatchToProps = (dispatch) => ({
    fetch_more: (cursor) => dispatch(fetch_more_data(cursor))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
