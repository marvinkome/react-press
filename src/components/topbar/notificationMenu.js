import React from 'react';
import types from 'prop-types';
import { MdNotificationsActive, MdNotificationsNone } from 'react-icons/lib/md';
import Notifications from './Notifications';

export default class NotificationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.notificationDropdownTrigger = React.createRef();
        this.notificationDropdownIns;
    }
    componentDidMount() {
        this.register_dropdown(
            this.notificationDropdownTrigger.current,
            'DIV#notifications',
            'notificationDropdownIns',
            { onCloseEnd: () => this.props.readNotifications() }
        );
    }
    componentDidUpdate() {
        this.register_dropdown(
            this.notificationDropdownTrigger.current,
            'DIV#notifications',
            'notificationDropdownIns',
            { onCloseEnd: () => this.props.readNotifications() }
        );
    }
    componentWillUnmount() {
        this.deactivate_dropdown('notificationDropdownIns');
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
        return this.props.isLoggedIn ? (
            <ul className="right">
                <li>
                    <a
                        className="notification-icon"
                        ref={this.notificationDropdownTrigger}
                        data-target="notifications-menu"
                    >
                        {this.props.notifications_data.unread_count ? (
                            <MdNotificationsActive />
                        ) : (
                            <MdNotificationsNone />
                        )}
                    </a>

                    <Notifications notifications={this.props.notifications_data.notifications} />
                </li>
            </ul>
        ) : null;
    }
}

NotificationMenu.propTypes = {
    isLoggedIn: types.bool.isRequired,
    notifications_data: types.object,
    readNotifications: types.func
};
