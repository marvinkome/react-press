import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import UserDropDownMenu from './UserDropdown';

export default class UserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.userDropDownTrigger = React.createRef();
        this.userDropDownIns;
    }
    componentDidMount() {
        if (this.userDropDownTrigger.current !== null) {
            this.register_dropdown(
                this.userDropDownTrigger.current,
                'DIV#navbar-user-profile',
                'userDropDownIns'
            );
        }
    }
    componentWillUnmount() {
        this.deactivate_dropdown('userDropDownIns');
    }
    deactivate_dropdown = (ins) => {
        if (this[ins] !== undefined && this[ins] !== null) {
            this[ins].close();
            this[ins].destroy();
        }
    };
    register_dropdown = (elem, container, ins, extraOptions = {}) => {
        if (elem != null && window.M !== undefined) {
            this[ins] = window.M.Dropdown.init(elem, {
                constrainWidth: false,
                coverTrigger: false,
                alignment: 'center',
                container,
                ...extraOptions
            });
        }
    };
    render() {
        return (
            <ul className="right hide-on-small-only">
                {this.props.isLoggedIn ? (
                    <li>
                        <a
                            ref={this.userDropDownTrigger}
                            className="dropdown-trigger user-profile"
                            data-target="dropdown-menu"
                        >
                            <img
                                className={
                                    'user-image responsive-img circle ' +
                                    this.props.imageData.imageClass
                                }
                                src={this.props.imageData.image}
                            />
                        </a>
                        <UserDropDownMenu handleLogout={this.props.logout} />
                    </li>
                ) : (
                    <React.Fragment>
                        <li>
                            <Link href="/login">
                                <a className="sign-in">Sign in</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                <a className="sign-up btn">Get started</a>
                            </Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        );
    }
}

UserMenu.propTypes = {
    isLoggedIn: types.bool.isRequired,
    imageData: types.object.isRequired,
    logout: types.func
};
