import React from 'react';
import types from 'prop-types';
import { format_date } from '../../../js/helpers';
import img from '../../../img/default-pic.png';

export const Notifications = ({ notifications }) => (
    <div id="notifications" className="dropdown-container">
        <ul className="dropdown-content" id="notifications-menu">
            {notifications.length > 0 ?
                notifications.map((notification) => (
                    <li 
                        className={'notification ' + (notification.read == false ? 'unread' : '')}
                        key={notification.id}
                    >
                        <div className="row">
                            <div className="col s3">
                                <div className="author-image">
                                    <img src={img} className="responsive-img circle" />
                                </div>
                            </div>
                            <div className="notification-info col s9">
                                <p className="user-action">
                                    {notification.from.name} {' '}
                                    <span>{
                                        notification.type == 'comment' ? 
                                            'commented on': 'clapped for'}
                                    </span> {' '}
                                    {notification.post.title}
                                </p>
                                <p className="post-title">{notification.post.title}</p>
                                <p className="meta">{format_date(notification.timestamp)}</p>
                            </div>
                        </div>
                    </li>
                )) : (
                    <li className="notification">
                        <a className="center">No new notifications</a>
                    </li>
                )}
        </ul>
    </div>
);

Notifications.propTypes = {
    notifications: types.array.isRequired
};
