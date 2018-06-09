import React from 'react';
import types from 'prop-types';
import { Link} from 'react-router-dom';
import { MdMenu, MdNotificationsNone, MdNotificationsActive } from 'react-icons/lib/md';
import { UserDropDownMenu } from './UserDropdown';
import { Notifications } from './Notifications';
import { NavMenu } from './navMenu';

export class NavBar extends React.Component {
    constructor(props){
        super(props);

        this.notificationDropdownTrigger = React.createRef();
        this.userDropDownTrigger = React.createRef();
        this.notificationDropdownIns;
        this.userDropDownIns;
    }
    componentDidMount(){
        this.register_dropdown(
            this.notificationDropdownTrigger.current, 
            'DIV#notifications',
            'notificationDropdownIns',
            {onCloseEnd: () => this.props.readNotifications()}
        );
    }
    componentDidUpdate(){
        this.register_dropdown(
            this.userDropDownTrigger.current,
            'DIV#navbar-user-profile', 
            'userDropDownIns'
        );
    }
    componentWillUnmount() {
        this.deactivate_dropdown('notificationDropdownIns');
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
                container,
                ...extraOptions
            });
        }
    };
    render() {
        const menu_class = this.props.stick ? ' sticky' : '';
        return (
            <nav className="topbar nav-extended">
                <div className="nav-wrapper">
                    {/* Menu icons for small screens */}
                    <a
                        href="#"
                        data-target="mobile-topbar"
                        className="sidenav-trigger hide-on-med-and-up"
                    >
                        <MdMenu />
                    </a>
    
                    {/* SiteTitle */}
                    <Link to="/" className="brand-logo center">
                        <span className="blog-title">ReactPress</span>
                    </Link>

                    {/* show login/signup or user-profile depending on login state */}
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
                                            'user-image responsive-img circle' + 
                                            this.props.imageData.imageClass}
                                        src={this.props.imageData.image}
                                    />
                                </a>
                                <UserDropDownMenu handleLogout={this.props.logout} />
                            </li>
                        ) : (
                            <React.Fragment>
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
                            </React.Fragment>
                        )}
                    </ul>
    
                    {/* show notification - menu for small and large screen*/}
                    {/* show only when loggedIn */}
                    {this.props.isLoggedIn && (
                        <ul className="right">
                            <li>
                                <a
                                    className="notification-icon"
                                    ref={this.notificationDropdownTrigger}
                                    data-target="notifications-menu"
                                >
                                    {this.props.notifications_data.unread_count > 0 ? (
                                        <MdNotificationsActive />
                                    ) : (
                                        <MdNotificationsNone />
                                    )}
                                </a>
        
                                <Notifications 
                                    notifications={this.props.notifications_data.notifications}/>
                            </li>
                        </ul>
                    )}
                </div>
    
                {/* Don't show menu on post page */}
                {(this.props.isPostPage) && (
                    <div className={'nav-content' + menu_class}>
                        <NavMenu />
                    </div>
                )}
            </nav>
        );
    }
}

NavBar.propTypes = {
    isLoggedIn: types.bool.isRequired,
    isPostPage: types.bool.isRequired,
    stick: types.bool.isRequired,
    imageData: types.object,
    notifications_data: types.object.isRequired,
    logout: types.func.isRequired,
    readNotifications: types.func.isRequired
};
