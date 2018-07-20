import React from 'react';
import types from 'prop-types';
import Link from 'next/link';

export class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.sidenav = React.createRef();
        this.sidenavIns;
    }
    componentDidMount() {
        const sidenav = this.sidenav.current;
        if (window.M) {
            this.sidenavIns = window.M.Sidenav.init(sidenav);
        }
    }
    componentWillUnmount() {
        if (this.sidenavIns !== undefined && this.sidenavIns !== null) {
            this.sidenavIns.close();
            this.sidenavIns.destroy();
        }
    }
    render() {
        return (
            <ul ref={this.sidenav} className="sidenav hide-on-med-and-up" id="mobile-topbar">
                <li>
                    <div className="user-view">
                        <a>
                            <img
                                className={'circle ' + this.props.data.imageClass}
                                src={this.props.data.image}
                            />
                        </a>
                        <span className="email">
                            Hello, {this.props.data.username}
                        </span>
                    </div>
                </li>

                {this.props.data.isLoggedIn ? (
                    <React.Fragment>
                        <li>
                            <Link href="/admin/new-post">
                                <a>
                                    <span>New Post</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/posts">
                                <a>
                                    <span>All Posts</span>
                                </a>
                            </Link>
                        </li>
                        <div className="divider" />
                        <li>
                            <Link href="/admin/posts">
                                <a>
                                    <span>Dashboard</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <a title="Logout" onClick={this.props.logout}>
                                <span>Logout</span>
                            </a>
                        </li>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <li>
                            <Link href="/login">
                                <a className="hide-on-med-and-up">Sign In</a>
                            </Link>
                        </li>
                        <div className="divider" />
                        <li>
                            <Link href="/signup">
                                <a className="hide-on-med-and-up">Get Started</a>
                            </Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        );
    }
}

SideNav.propTypes = {
    data: types.object.isRequired,
    logout: types.func.isRequired
};
