import React from 'react';
import types from 'prop-types';
import Link from 'next/link';

const UserDropDownMenu = ({ handleLogout }) => {
    return (
        <div id="navbar-user-profile" className="dropdown-container">
            <ul className="dropdown-content" id="dropdown-menu">
                <li>
                    <Link href="/me/new-post">
                        <a>New Post</a>
                    </Link>
                </li>
                <li>
                    <Link href="/me/posts">
                        <a>All Posts</a>
                    </Link>
                </li>
                <li>
                    <div className="divider" />
                </li>
                <li>
                    <Link href="/me/edit-profile">
                        <a>Edit Profile</a>
                    </Link>
                </li>
                <li>
                    <a className="logout" onClick={handleLogout}>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

UserDropDownMenu.propTypes = {
    handleLogout: types.func.isRequired
};

export default UserDropDownMenu;
