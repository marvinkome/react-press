import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { format_date, get_page_link } from '../../lib/helpers';

const Notifications = ({ notifications }) => {
    const RenderNotifications = ({ notification }) => {
        const {
            node: { read, post, id, fromAuthor, type, timestamp }
        } = notification;

        const page_link = get_page_link(post.title, post.id);

        return (
            <li className={'notification ' + (read === false ? 'unread' : '')} key={id}>
                <div className="row">
                    <div className="col s3">
                        <div className="author-image">
                            <img
                                src={fromAuthor.gravatarUrl || '/static/default-pic.png'}
                                className="responsive-img circle"
                            />
                        </div>
                    </div>
                    <div className="notification-info col s9">
                        <p className="user-action">
                            {fromAuthor.fullName}{' '}
                            <span>{type == 'comment' ? 'commented on' : 'clapped for'}</span>{' '}
                        </p>
                        <p className="post-title">
                            <Link href={`/p/${page_link}`}>
                                <a>{post.title}</a>
                            </Link>
                        </p>
                        <p className="meta">{format_date(timestamp)}</p>
                    </div>
                </div>
            </li>
        );
    };
    RenderNotifications.propTypes = { notification: types.object };

    const RenderNoNotifications = () => {
        return (
            <li className="notification">
                <a className="center">You have no notifications</a>
            </li>
        );
    };

    return (
        <div id="notifications" className="dropdown-container">
            <ul className="dropdown-content" id="notifications-menu">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <RenderNotifications
                            key={notification.node.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <RenderNoNotifications />
                )}
            </ul>
        </div>
    );
};

Notifications.propTypes = {
    notifications: types.array.isRequired
};

export default Notifications;
