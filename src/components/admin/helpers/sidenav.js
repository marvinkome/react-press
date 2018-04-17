/**
 * ./src/components/admin/helpers/sidenav
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideNav extends Component {
    constructor(props) {
        super(props);
        this.sideNav = React.createRef();
        this.collapsible = React.createRef();
    }
    componentDidMount() {
        const sidenav = this.sideNav.current;
        const collapsible = this.collapsible.current;
        window.M.Sidenav.init(sidenav);
        window.M.Collapsible.init(collapsible);
    }
    componentWillUnmount() {
        const sidenav = this.sideNav.current;
        const instance = window.M.Sidenav.getInstance(sidenav);
        instance.destroy();
    }
    render() {
        return (
            <div>
                <nav className="admin-nav white">
                    <div className="nav-wrapper">
                        <a className="brand-logo">
                            <i className="fa fa-codiepie" />
                        </a>
                        <a
                            data-target="mobile-demo"
                            className="sidenav-trigger"
                        >
                            Menu
                        </a>
                        <ul className="right">
                            <li className="hide-small">
                                <a title="Notification">
                                    <i className="fa fa-bell-o" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ul
                    ref={this.sideNav}
                    className="sidenav sidenav-fixed"
                    id="mobile-demo"
                >
                    <li className="grey darken-4">
                        <div className="user-view">
                            <div className="background" />
                            <a>
                                <img
                                    className="circle"
                                    src="./src/img/pp.jpg"
                                />
                            </a>
                            <a>
                                <span className="name">John Doe</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <ul
                            ref={this.collapsible}
                            className="collapsible collapsible-accordion"
                        >
                            <li>
                                <a className="collapsible-header">
                                    <span>Posts</span>
                                    <i className="fa fa-angle-down" />
                                </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/admin/posts">
                                                All Posts
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="divider" />
                    </li>
                    <li>
                        <a>Settings</a>
                    </li>
                </ul>
            </div>
        );
    }
}
