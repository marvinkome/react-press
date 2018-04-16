/**
 * ./src/components/post/view/comment
 */

import React from 'react';
import PropTypes from 'prop-types';
import { format_date } from '../../../js/helpers';

const Comment = ({ data }) => (
    <div className="response">
        <h5>Responses</h5>

        {data.edges.map(obj => (
            <ul key={obj.node.uuid} className="collection">
                <li className="collection-item">
                    <div className="comment-author row">
                        <div className="comment-author-image col s1">
                            <img
                                src={obj.node.author.gravatarUrl}
                                alt=""
                                className="responsive-img circle"
                            />
                        </div>
                        <div className="comment-author-info col s11">
                            <p className="title">{obj.node.author.fullName}</p>
                            <span className="post-meta">
                                {format_date(obj.node.timestamp)}
                            </span>
                        </div>
                    </div>

                    <div className="comment-resp">{obj.node.body}</div>
                </li>
                {obj.node.replies.edges.map(reply => (
                    <li key={reply.node.uuid} className="collection-item">
                        <div className="comment-author row">
                            <div className="comment-author-image col s1">
                                <img
                                    src={reply.node.author.gravatarUrl}
                                    alt=""
                                    className="responsive-img circle"
                                />
                            </div>
                            <div className="comment-author-info col s11">
                                <p className="title">
                                    {reply.node.author.fullName}
                                </p>
                                <span className="post-meta">
                                    {format_date(reply.node.timestamp)}
                                </span>
                            </div>
                        </div>

                        <div className="comment-resp">{reply.node.body}</div>
                    </li>
                ))}
            </ul>
        ))}
    </div>
);

Comment.propTypes = {
    data: PropTypes.object.isRequired
};

export default Comment;
{
    /* <li key={obj.node.uuid} className="collection-item avatar">
                        <img src="./src/img/pp.jpg" alt="" className="circle" />
                        <a>
                            <span className="title">{obj.node.author.fullName}</span>
                        </a>
                        <div className="comment-resp">
                            {obj.node.body}
                        </div>
                        <a href="#!" className="secondary-content">
                            {format_date(obj.node.timestamp)}
                        </a>
                    </li> */
}
