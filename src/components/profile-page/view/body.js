/**
 * ./src/components/profile-page/view/body
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import AuthorInfo from './author-info';
import UserPosts from './user-posts';

import Preloader from '../../helpers/preloader';
import { DEFAULT_TITLE } from '../../helpers/constants';
import { fetch_profile_data } from '../../../js/redux/actions';

class Body extends Component {
    constructor(props){
        super(props);

        this.state = {
            profile: undefined,
            render: true,
            user_id: ''
        };
    }

    componentDidMount(){
        // Get the username and id from url
        const user_name_list = this.props.user.split('_');
        const user_name = user_name_list.slice(0, user_name_list.length-1).join('_');
        const user_id = user_name_list.slice(user_name_list.length-1).join('_');

        // set the user id to state
        this.setState({
            user_id
        });

        // Find the profile in store
        const profile = this.props.profiles.find(obj => obj.id == user_id);

        if (profile == undefined) {
            // If the profile isn't in store fetch it
            this.props.getProfileData(user_name).then(null, () =>
                this.setState({
                    render: false
                })
            );
        } else {
            // If profile is in store the add it to state
            this.setState({
                profile
            });
        }

        if( this.state.profile !== undefined ) {
            document.title = this.state.profile.fullName + ' - ' + DEFAULT_TITLE;
        } else {
            document.title = 'User not found - ' + DEFAULT_TITLE;
        }
    }

    componentWillReceiveProps(props){
        // After fetching the user check if the id matches a profile in the store
        const profile = props.profiles.find(obj => obj.id == this.state.user_id);

        // Then add it to store
        this.setState({
            profile
        });
    }

    componentDidUpdate() {
        if( this.state.profile !== undefined ) {
            document.title = this.state.profile.fullName + ' - ' + DEFAULT_TITLE;
        } else {
            document.title = 'User not found - ' + DEFAULT_TITLE;
        }
    }
    
    render(){
        // Check if server didn't produce any error
        return this.state.render ? (
            <div className="page-body section container">
                <div className="row">
                    <div className="col s12">
                        {/* check if its fetching user */}
                        {this.props.fetching ? (
                            <Preloader/> // show preloader
                        ) : (
                            // check if the correct profile was found
                            this.state.profile !== undefined ? (
                                <div>
                                    <AuthorInfo data={this.state.profile}/>
                                    <UserPosts data={this.state.profile}/>
                                </div>
                            ) : (
                                <div>
                                    <h5 className='center'>User not found</h5>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        ) : (<h5>Oops something went wrong</h5>);
    }
}

const mapActionsToProps = (dispatch) => ({
    getProfileData: (username) =>  dispatch(fetch_profile_data(username))
});

const mapDataToProps = store => ({
    fetching: store.isFetching,
    profiles: store.public_users.users
});

Body.propTypes = {
    getProfileData: types.func.isRequired,
    user: types.string.isRequired,
    profiles: types.array.isRequired,
    fetching: types.bool.isRequired
};

export default connect(mapDataToProps, mapActionsToProps)(Body);