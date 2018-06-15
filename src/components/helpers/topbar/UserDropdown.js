import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

const UserDropDownMenu = ({ handleLogout }) => {
    return (
        <div id="navbar-user-profile" className="dropdown-container">
            <ul className="dropdown-content" id="dropdown-menu">
                <li>
                    <Link to="/admin/new-post">New Post</Link>
                </li>
                <li>
                    <Link to="/admin/posts">All Posts</Link>
                </li>
                <li>
                    <div className="divider" />
                </li>
                <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
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
