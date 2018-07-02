import React from 'react';
import types from 'prop-types';
import { MainPage } from '../../../components/app';
import PageBody from './view';
import { connect } from 'react-redux';
import { delete_post } from '../../../store/actions';
import './style.less';

const AdminPosts = ({ data, loggedIn, delete_post }) => {
    return (
        <MainPage
            loggedIn={loggedIn}
            render={() => <PageBody data={data} deletePost={delete_post} />}
        />
    );
};

AdminPosts.propTypes = {
    data: types.object.isRequired,
    loggedIn: types.bool.isRequired,
    delete_post: types.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.user_data
});

const mapDispatchToProp = (dispatch) => ({
    delete_post: (id) => dispatch(delete_post(id))
});

export default connect(mapStateToProps, mapDispatchToProp)(AdminPosts);
