/**
 * ./src/components/admin/helpers/sidenav
 */

import React, { Component } from 'react';

export default class SideNav extends Component {
    constructor(props) {
        super(props);
        this.sideNav = React.createRef();
    }
    componentDidMount() {
        const sidenav = this.sideNav.current;
        window.M.Sidenav.init(sidenav);
    }
    componentWillUnmount() {}
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
                        <a>Dashboard</a>
                    </li>
                    <li>
                        <a>Posts</a>
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
