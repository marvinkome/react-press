/**
 * ./src/components/post/view/comment
 */

import React from 'react';
import PropTypes from 'prop-types';
import { format_date } from '../../../js/helpers';

const Comment = ({ data }) => (
    <div className="response">
        <h5>Responses</h5>

        <div className="resp-form">
            <form className="row">
                <div className="input-field col s12">
                    <textarea
                        className="materialize-textarea"
                        placeholder="Write a response"
                    />
                </div>
                <div className="col 12 input-field">
                    <button type="submit" className="btn">
                        Publish
                    </button>
                </div>
            </form>
        </div>

        {data.edges.map(obj => (
            <ul key={obj.node.id} className="collection">
                <li className="collection-item">
                    <div className="comment-author row">
                        <div className="comment-author-image col s4 m1">
                            <img
                                src={obj.node.author.gravatarUrl}
                                alt=""
                                className="responsive-img circle"
                            />
                        </div>
                        <div className="comment-author-info col s8 m11">
                            <p className="title">{obj.node.author.fullName}</p>
                            <span className="post-meta">
                                {format_date(obj.node.timestamp)}
                            </span>{' '}
                            -{' '}
                            <span className="post-meta">
                                <a title="reply">reply</a>
                            </span>
                        </div>
                    </div>

                    <div className="comment-resp">{obj.node.body}</div>

                    <div className="reply-form">
                        <form className="row">
                            <div className="input-field col s12">
                                <textarea
                                    className="materialize-textarea"
                                    placeholder="Write a reply"
                                />
                            </div>
                            <div className="col 12 input-field">
                                <button type="submit" className="btn">
                                    Publish
                                </button>
                                <a className="btn-flat">Close</a>
                            </div>
                        </form>
                    </div>
                </li>
                {obj.node.replies.edges.map(reply => (
                    <li key={reply.node.id} className="collection-item">
                        <div className="comment-author row">
                            <div className="comment-author-image col s4 m1">
                                <img
                                    src={reply.node.author.gravatarUrl}
                                    alt=""
                                    className="responsive-img circle"
                                />
                            </div>
                            <div className="comment-author-info col s8 m11">
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
