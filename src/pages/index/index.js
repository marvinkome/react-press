import React from 'react';
import wrapper from '../../components/app';
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

export default wrapper(connect(mapStateToProps)(Index));
