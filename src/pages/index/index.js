import React from 'react';
import withTopbar from '../../components/app';
import { connect } from 'react-redux';
import Body from './view/index';
import './home.less';

const Index = (props) => (
    <Body {...props}/>
);
  
const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    cursor: state.cursor,
    hasMore: state.hasNextPage
});

export default withTopbar(connect(mapStateToProps)(Index));
