import React from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, readAllNotifications } from '../../store/actions-creators';
import { NavBar } from './navBar';
import { SideNav } from './sideNav';
import './topbar.less';

export class TopBar extends React.Component {
    handleLogout = () => {
        this.props.logout();
    };
    readNotifications = () => {
        this.props.readNotifications();
    };
    render() {
        const isLoggedIn = this.props.user_data != undefined && this.props.user_data !== null;
        const username = this.props.user_data ? this.props.user_data.user.fullName : null;
        const notifications_data = this.props.notifications;
        let imageClass = ' defImg';
        let image = '/static/default-pic.png';

        if (isLoggedIn) {
            if (this.props.user_data.user.gravatarUrl !== null) {
                image = this.props.user_data.user.gravatarUrl;
                imageClass = '';
            }
        }

        const navbarProps = {
            isLoggedIn,
            notifications_data,
            imageData: {
                imageClass,
                image
            },
            logout: this.handleLogout,
            readNotifications: this.readNotifications
        };

        const sidenavProps = {
            data: {
                image,
                imageClass,
                isLoggedIn,
                username
            },
            logout: this.handleLogout
        };

        return (
            <div className="navbar-wrapper">
                <NavBar {...navbarProps} />
                <SideNav {...sidenavProps} />
            </div>
        );
    }
}

TopBar.propTypes = {
    user_data: types.object,
    notifications: types.object,
    logout: types.func.isRequired,
    readNotifications: types.func.isRequired
};

const mapStateToProp = (state) => ({
    notifications: state.notifications_data
});

const mapDispatchToProp = (dispatch) => ({
    logout: () => dispatch(logoutUser()),
    readNotifications: () => dispatch(readAllNotifications())
});

export default connect(mapStateToProp, mapDispatchToProp)(TopBar);
