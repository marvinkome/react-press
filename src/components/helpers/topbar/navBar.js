import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/lib/md';

import NotificationsMenu from './notificationMenu';
// import NavMenu from './navMenu'; Hidden till implemented
import UserMenu from './userMenu';

export class NavBar extends React.Component {
    render_menu_icon = () => (
        <a href="#" data-target="mobile-topbar" className="sidenav-trigger hide-on-med-and-up">
            <MdMenu />
        </a>
    );
    render_site_title = () => (
        <Link to="/" className="brand-logo center">
            <span className="blog-title">ReactPress</span>
        </Link>
    );
    render() {
        // const menu_class = this.props.stick ? ' sticky' : ''; Hidden till implemented
        const isLoggedIn = this.props.isLoggedIn;

        const user_menu_props = {
            isLoggedIn,
            imageData: this.props.imageData,
            logout: this.props.logout
        };

        const notifications_props = {
            isLoggedIn,
            notifications_data: this.props.notifications_data,
            readNotifications: this.props.readNotifications
        };

        return (
            <nav className="topbar nav-extended">
                <div className="nav-wrapper">
                    {/* Menu icons for small screens */}
                    {this.render_menu_icon()}

                    {/* SiteTitle */}
                    {this.render_site_title()}

                    {/* show login/signup or user-profile depending on login state */}
                    <UserMenu {...user_menu_props} />

                    {/* show notification - menu for small and large screen*/}
                    <NotificationsMenu {...notifications_props} />
                </div>

                {/* Don't show menu on post page */}
                {/* Menu hidden until feature is implemented */}
                {/* {this.props.isHomePage && (
                    <div className={'nav-content' + menu_class}>
                        <NavMenu />
                    </div>
                )} */}
            </nav>
        );
    }
}

NavBar.propTypes = {
    isLoggedIn: types.bool.isRequired,
    isHomePage: types.bool.isRequired,
    stick: types.bool.isRequired,
    imageData: types.object,
    notifications_data: types.object.isRequired,
    logout: types.func.isRequired,
    readNotifications: types.func.isRequired
};
