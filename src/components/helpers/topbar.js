/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopBar extends Component {
    render() {
        return (
            <nav className="topbar nav-extended">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">
                        <i className="fa fa-codiepie" />
                    </Link>
                    <div className="blog-info">
                        <span className="blog-title">freeCodeCamp</span>
                        <div className="social">
                            <a title="Twitter">
                                <i className="fa fa-twitter" />
                            </a>
                            <a title="Facebook">
                                <i className="fa fa-facebook" />
                            </a>
                            <a className="btn follow"> follow </a>
                        </div>
                    </div>
                    <ul className="right hide-on-small-only">
                        {/* <li className="hide-small">
                            <a title="Notification">
                                <i className="fa fa-bell-o" />
                            </a>
                        </li>
                        <li>
                            <a className="user-profile">
                                <img
                                    className="user-image responsive-img circle"
                                    src="./src/img/pp.jpg"
                                />
                            </a>
                        </li> */}
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
                    <ul className="right hide-on-med-and-up">
                        <li>
                            <Link
                                className="hide-on-med-and-up"
                                to="/auth/login"
                            >
                                <i className="fa fa-sign-in" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="hide-on-med-and-up"
                                to="/auth/login"
                            >
                                <i className="fa fa-user-plus" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default TopBar;
