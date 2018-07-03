import React from 'react';
import types from 'prop-types';
import { MainPage } from '../../../components/app';
import { connect } from 'react-redux';
import {
    fetch_all_data,
    fetch_user_data,
    update_profile_pic,
    update_user_info
} from '../../../store/actions';
import PageBody from './view';
import './style.less';

const EditProfile = ({ loggedIn, data, ...props }) => {
    const pageProps = {
        data,
        fetch_user_data: props.fetch_user_data,
        fetch_data: props.fetch_data,
        update_profile_pic: props.update_profile_pic,
        update_user_info: props.update_user_info
    };
    return <MainPage loggedIn={loggedIn} render={() => <PageBody {...pageProps} />} />;
};

EditProfile.propTypes = {
    loggedIn: types.bool.isRequired,
    data: types.object.isRequired,
    fetch_user_data: types.func.isRequired,
    fetch_data: types.func.isRequired,
    update_profile_pic: types.func.isRequired,
    update_user_info: types.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.user_data
});

const mapDispatchToProps = (dispatch) => ({
    fetch_user_data: (token) => dispatch(fetch_user_data(token)),
    fetch_data: () => dispatch(fetch_all_data()),
    update_profile_pic: (data) => dispatch(update_profile_pic(data)),
    update_user_info: (data) => dispatch(update_user_info(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
