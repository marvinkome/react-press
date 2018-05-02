/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../js/redux/actions';
import './style/topbar.css';

const mapDispatchToProp = dispatch => ({
    logout: () => dispatch(logoutUser())
});

class TopBar extends Component {
    constructor(props) {
        super(props);

        this.sidenav = React.createRef();
        this.sidenavIns;
    }
    componentDidMount() {
        const sidenav = this.sidenav.current;
        this.sidenavIns = window.M.Sidenav.init(sidenav);
    }
    componentWillUnmount() {
        this.sidenavIns.destroy();
    }
    handleLogout = () => {
        this.props.logout();
    };
    render() {
        return (
            <div>
                <nav className="topbar nav-extended">
                    <div className="nav-wrapper">
                        <a
                            href="#"
                            data-target="mobile-topbar"
                            className="sidenav-trigger"
                        >
                            <i className="material-icons">menu</i>
                        </a>
                        <div className="blog-info">
                            <Link to="/" className="brand-logo">
                                <span className="blog-title">ReactPress</span>
                            </Link>
                        </div>
                        {this.props.user_data != undefined ? (
                            <ul className="right hide-on-small-only">
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        title="Go to dashboard"
                                    >
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        title="Logout"
                                        onClick={this.handleLogout}
                                    >
                                        <span>Logout</span>
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        title="Go to dashboard"
                                        className="user-profile"
                                    >
                                        <img
                                            className="user-image responsive-img circle"
                                            src={
                                                this.props.user_data.user
                                                    .gravatarUrl
                                            }
                                        />
                                    </Link>
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
                                    <Link
                                        to="/auth/signup"
                                        className="sign-up btn"
                                    >
                                        Get started
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>

                <ul ref={this.sidenav} className="sidenav" id="mobile-topbar">
                    {this.props.user_data != undefined ? (
                        <div>
                            <li>
                                <div className="user-view">
                                    {this.props.user_data.user.gravatarUrl !=
                                        null && (
                                        <a>
                                            <img
                                                className="circle"
                                                src={
                                                    this.props.user_data.user
                                                        .gravatarUrl
                                                }
                                            />
                                        </a>
                                    )}
                                    <Link
                                        to="/admin/dashboard"
                                        className="email white-text"
                                        title="Go to dashboard"
                                    >
                                        <span>Dashboard</span>
                                    </Link>
                                </div>
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
                                <Link
                                    className="hide-on-med-and-up"
                                    to="/auth/login"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <div className="divider" />
                            <li>
                                <Link
                                    className="hide-on-med-and-up"
                                    to="/auth/signup"
                                >
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
