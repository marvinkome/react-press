import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { format_date, get_page_link } from '../../lib/helpers';

const Notifications = ({ notifications }) => (
    <div id="notifications" className="dropdown-container">
        <ul className="dropdown-content" id="notifications-menu">
            {notifications.length > 0 ? (
                notifications.map((notification) => {
                    const page_link = get_page_link(notification.post.title, notification.post.id);
                    return (
                        <li
                            className={
                                'notification ' + (notification.read == false ? 'unread' : '')
                            }
                            key={notification.id}
                        >
                            <div className="row">
                                <div className="col s3">
                                    <div className="author-image">
                                        <img
                                            src="/static/default-pic.png"
                                            className="responsive-img circle"
                                        />
                                    </div>
                                </div>
                                <div className="notification-info col s9">
                                    <p className="user-action">
                                        {notification.from.name}{' '}
                                        <span>
                                            {notification.type == 'comment'
                                                ? 'commented on'
                                                : 'clapped for'}
                                        </span>{' '}
                                    </p>
                                    <p className="post-title">
                                        <Link as={`/p/${page_link}`} href={`/post?id=${page_link}`}>
                                            <a>{notification.post.title}</a>
                                        </Link>
                                    </p>
                                    <p className="meta">{format_date(notification.timestamp)}</p>
                                </div>
                            </div>
                        </li>
                    );
                })
            ) : (
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

export default Notifications;
