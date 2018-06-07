/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../js/redux/actions';
import img from '../../img/default-pic.png';
import { MdMenu, MdNotificationsNone } from 'react-icons/lib/md';
import './topbar.less';

export const Dropdown = ({ handleLogout }) => (
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

export const NavMenu = () => (
    <div>
        <span>
            <a>home</a>
        </span>
        <span>
            <a>trust</a>
        </span>
        <span>
            <a>culture</a>
        </span>
        <span>
            <a>tech</a>
        </span>
        <span>
            <a>entreprenuership</a>
        </span>
        <span>
            <a>self</a>
        </span>
        <span>
            <a>politics</a>
        </span>
        <span>
            <a>media</a>
        </span>
        <span>
            <a>design</a>
        </span>
        <span>
            <a>programming</a>
        </span>
        <span>
            <a>art</a>
        </span>
        <span>
            <a>popular</a>
        </span>
        <span>
            <a>science</a>
        </span>
    </div>
);

export const MobileSideNav = ({ data, logout }) => (
    <div>
        <li>
            <div className="user-view">
                <a>
                    <img className={'circle' + data.imageClass} src={data.image} />
                </a>
                <span className="email">Hello, {data.isLoggedIn ? data.username : 'Guest'}</span>
            </div>
        </li>

        {data.isLoggedIn ? (
            <div>
                <li>
                    <Link to="/admin/new-post">
                        <span>New Post</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/posts">
                        <span>All Posts</span>
                    </Link>
                </li>
                <div className="divider" />
                <li>
                    <Link to="/admin/posts">
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <a title="Logout" onClick={logout}>
                        <span>Logout</span>
                    </a>
                </li>
            </div>
        ) : (
            <div>
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
    </div>
);

export class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sticky: false
        };

        this.sidenav = React.createRef();
        this.dropdown = React.createRef();
        this.sidenavIns;
        this.dropdownIns;
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
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
        window.removeEventListener('scroll', this.onScroll, false);
        if (this.sidenavIns !== undefined && this.sidenavIns !== null) {
            this.sidenavIns.close();
            this.sidenavIns.destroy();
        }

        if (this.dropdownIns !== undefined && this.dropdownIns !== null) {
            this.dropdownIns.close();
            this.dropdownIns.destroy();
        }
    }
    onScroll = () => {
        if (this.props.isPostPage === undefined || this.props.isPostPage === false) {
            if (window.pageYOffset >= 72) {
                this.setState({
                    sticky: true
                });
            } else {
                this.setState({
                    sticky: false
                });
            }
        }
    };
    handleLogout = () => {
        this.props.logout();
    };
    render_navbar = (data) => (
        <ul className="right hide-on-small-only">
            {data.isLoggedIn ? (
                <div>
                    <li>
                        <a className="notification-icon">
                            <MdNotificationsNone />
                        </a>
                    </li>
                    <li>
                        <a
                            ref={this.dropdown}
                            className="dropdown-trigger user-profile"
                            data-target="dropdown-menu"
                        >
                            <img
                                className={'user-image responsive-img circle' + data.imageClass}
                                src={data.image}
                            />
                        </a>
                        <Dropdown handleLogout={this.handleLogout} />
                    </li>
                </div>
            ) : (
                <div>
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
                </div>
            )}
        </ul>
    );
    render() {
        let defaultImageClass = ' defImg';
        let userImg = img;

        if (this.props.user_data !== undefined && this.props.user_data !== null) {
            if (this.props.user_data.user.gravatarUrl !== null) {
                userImg = this.props.user_data.user.gravatarUrl;
                defaultImageClass = '';
            }
        }

        const menu_class = this.state.sticky ? ' sticky' : '';
        const nav_data = {
            isLoggedIn: this.props.user_data != undefined && this.props.user_data !== null,
            imageClass: defaultImageClass,
            image: userImg,
            username: this.props.user_data ? this.props.user_data.user.fullName : null
        };

        return (
            <div className="navbar-wrapper">
                <div className="">
                    <nav className="topbar nav-extended">
                        <div className="nav-wrapper">
                            <a
                                href="#"
                                data-target="mobile-topbar"
                                className="sidenav-trigger hide-on-med-and-up"
                            >
                                <MdMenu />
                            </a>

                            <Link to="/" className="brand-logo center">
                                <span className="blog-title">ReactPress</span>
                            </Link>

                            <a className="notification-icon-on-small right hide-on-med-and-up">
                                <MdNotificationsNone />
                            </a>

                            {this.render_navbar(nav_data)}
                        </div>

                        {(this.props.isPostPage === undefined ||
                            this.props.isPostPage === false) && (
                            <div className={'nav-content' + menu_class}>
                                <NavMenu />
                            </div>
                        )}
                    </nav>
                </div>

                <ul ref={this.sidenav} className="sidenav hide-on-med-and-up" id="mobile-topbar">
                    <MobileSideNav data={nav_data} logout={this.handleLogout} />
                </ul>
            </div>
        );
    }
}

Dropdown.propTypes = {
    handleLogout: PropTypes.func.isRequired
};

MobileSideNav.propTypes = {
    data: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

TopBar.propTypes = {
    isPostPage: PropTypes.bool,
    user_data: PropTypes.object,
    logout: PropTypes.func.isRequired
};

const mapDispatchToProp = (dispatch) => ({
    logout: () => dispatch(logoutUser())
});

export default connect(null, mapDispatchToProp)(TopBar);
