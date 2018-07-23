import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { MdMenu } from 'react-icons/lib/md';

import NotificationsMenu from './notificationMenu';
import UserMenu from './userMenu';

export const NavBar = ({
    isLoggedIn,
    imageData,
    logout,
    notifications_data,
    readNotifications
}) => {
    const render_menu_icon = () => {
        return (
            <a data-target="mobile-topbar" className="sidenav-trigger hide-on-med-and-up">
                <MdMenu />
            </a>
        );
    };

    const render_site_title = () => {
        return (
            <Link href="/">
                <a className="brand-logo center">
                    <span className="blog-title">Blogly</span>
                </a>
            </Link>
        );
    };

    const user_menu_props = {
        isLoggedIn,
        imageData,
        logout
    };

    const notifications_props = {
        isLoggedIn,
        notifications_data,
        readNotifications
    };

    return (
        <nav className="topbar nav-extended">
            <div className="nav-wrapper">
                {/* Menu icons for small screens */}
                {render_menu_icon()}

                {/* SiteTitle */}
                {render_site_title()}

                {/* show login/signup or user-profile depending on login state */}
                <UserMenu {...user_menu_props} />

                {/* show notification - menu for small and large screen*/}
                <NotificationsMenu {...notifications_props} />
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    isLoggedIn: types.bool.isRequired,
    imageData: types.object,
    notifications_data: types.object,
    logout: types.func,
    readNotifications: types.func
};
