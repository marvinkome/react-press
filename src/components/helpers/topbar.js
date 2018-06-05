/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../js/redux/actions';
import img from '../../img/default-pic.png';
import * as MD from 'react-icons/lib/md';
import './topbar.less';

const mapDispatchToProp = (dispatch) => ({
    logout: () => dispatch(logoutUser())
});

class TopBar extends Component {
    constructor(props) {
        super(props);

        this.sidenav = React.createRef();
        this.dropdown = React.createRef();
        this.sidenavIns;
        this.dropdownIns;
    }
    componentDidMount() {
        const dropdown = this.dropdown.current;
        const sidenav = this.sidenav.current;
        if (window.M) {
            this.sidenavIns = window.M.Sidenav.init(sidenav);
            this.dropdownIns = window.M.Dropdown.init(dropdown, {
                constrainWidth: false,
                coverTrigger: false,
                container: 'DIV.dropdown-container'
            });
        }
    }
    componentDidUpdate() {
        if (this.dropdown.current != null) {
            const dropdown = this.dropdown.current;
            this.dropdownIns = window.M.Dropdown.init(dropdown, {
                constrainWidth: false,
                coverTrigger: false,
                container: 'DIV.dropdown-container'
            });
        }
    }
    componentWillUnmount() {
        if (this.sidenavIns !== undefined && this.sidenavIns !== null) {
            this.sidenavIns.close();
            this.sidenavIns.destroy();
        }

        if (this.dropdownIns !== undefined && this.dropdownIns !== null) {
            this.dropdownIns.close();
            this.dropdownIns.destroy();
        }
    }
    handleLogout = () => {
        this.props.logout();
    };
    render() {
        let defaultImageClass = ' defImg';
        let defImg = img;

        if (this.props.user_data !== undefined && this.props.user_data !== null) {
            if (this.props.user_data.user.gravatarUrl !== null) {
                defImg = this.props.user_data.user.gravatarUrl;
                defaultImageClass = '';
            }
        }

        return (
            <div className="navbar-wrapper">
                <div className="navbar-fixed">
                    <nav className="topbar nav-extended">
                        <div className="nav-wrapper">
                            <a
                                href="#"
                                data-target="mobile-topbar"
                                className="sidenav-trigger hide-on-med-and-up"
                            >
                                <MD.MdMenu/>
                            </a>

                            <Link to="/" className="brand-logo center">
                                <span className="blog-title">ReactPress</span>
                            </Link>

                            <a className="notification-icon-on-small right hide-on-med-and-up">
                                <MD.MdNotificationsNone />
                            </a>

                            {this.props.user_data != undefined && this.props.user_data !== null ? (
                                <ul className="right hide-on-small-only">
                                    <li>
                                        <a className="notification-icon">
                                            <MD.MdNotificationsNone />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            ref={this.dropdown}
                                            className="dropdown-trigger user-profile"
                                            data-target="dropdown-menu"
                                        >
                                            <img
                                                className={
                                                    'user-image responsive-img circle' +
                                                    defaultImageClass
                                                }
                                                src={defImg}
                                            />
                                        </a>
                                        <div className="dropdown-container">
                                            <ul className="dropdown-content" id="dropdown-menu">
                                                <li>
                                                    <Link to="/admin/new-post">New Post</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/posts">All Posts</Link>
                                                </li>
                                                <li>
                                                    <div className="divider" />
                                                    <Link to="/admin/dashboard">Dashboard</Link>
                                                </li>
                                                <li>
                                                    <a onClick={this.handleLogout}>Logout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="right hide-on-small-only">
                                    <li>
                                        <Link to="/auth/login" className="sign-in">
                                            Sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auth/signup" className="sign-up btn">
                                            Get started
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <div className="nav-content">
                            <div>
                                <span><a>home</a></span>
                                <span><a>design</a></span>
                                <span><a>programming</a></span>
                                <span><a>entrepreneur</a></span>
                            </div>
                        </div>
                    </nav>
                </div>

                <ul ref={this.sidenav} className="sidenav hide-on-med-and-up" id="mobile-topbar">
                    {this.props.user_data != undefined && this.props.user_data !== null ? (
                        <div>
                            <li>
                                <div className="user-view">
                                    <a>
                                        <img
                                            className={'circle' + defaultImageClass}
                                            src={defImg}
                                        />
                                    </a>
                                    <span className="email">
                                        Hello, {this.props.user_data.user.fullName}
                                    </span>
                                </div>
                            </li>
                            <li>
                                <Link to="/admin/dashboard" title="Go to dashboard">
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <a title="Logout" onClick={this.handleLogout}>
                                    <span>Logout</span>
                                </a>
                            </li>
                            <div className="divider" />
                        </div>
                    ) : (
                        <div>
                            <li>
                                <div className="user-view">
                                    <a>
                                        <img
                                            className={'circle' + defaultImageClass}
                                            src={defImg}
                                        />
                                    </a>
                                    <span className="email">Hello, Guest</span>
                                </div>
                            </li>
                            <li>
                                <Link className="hide-on-med-and-up" to="/auth/login">
                                    Sign In
                                </Link>
                            </li>
                            <div className="divider" />
                            <li>
                                <Link className="hide-on-med-and-up" to="/auth/signup">
                                    Get Started
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        );
    }
}

TopBar.propTypes = {
    user_data: PropTypes.object,
    logout: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProp)(TopBar);
