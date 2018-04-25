/**
 * ./src/components/post/view/comment
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format_date } from '../../../js/helpers';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            data: this.props.data,
            replying: false
        };
    }
    componentWillReceiveProps = np => {
        if (this.state.data != np.data) {
            this.setState({
                data: np.data
            });
        }
    };
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    onClickReply = e => {
        e.preventDefault();
        this.setState({
            replying: !this.state.replying
        });
    };
    onCommentPublish = e => {
        e.preventDefault();
        this.props.handleComment(this.state.comment);
        this.setState({
            comment: ''
        });
    };
    onCommentReply = (e, id, uuid) => {
        e.preventDefault();
        const comment = this.state[id];
        this.props.handleReply(comment, uuid);
        this.setState({
            [id]: ''
        });
    };
    render() {
        let style = {
            display: 'none'
        };

        if (this.state.replying) {
            style = {
                display: 'block'
            };
        }

        return (
            <div className="response">
                <h5>Responses</h5>

                <div className="resp-form">
                    <form className="row">
                        <div className="input-field col s12">
                            <textarea
                                value={this.state.comment}
                                id="comment"
                                className="materialize-textarea"
                                placeholder="Write a response"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col 12 input-field">
                            <button
                                onClick={this.onCommentPublish}
                                type="submit"
                                className="btn"
                            >
                                Publish
                            </button>
                        </div>
                    </form>
                </div>

                {this.state.data.edges.map(obj => (
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
                                    <p className="title">
                                        {obj.node.author.fullName}
                                    </p>
                                    <span className="post-meta">
                                        {format_date(obj.node.timestamp)}
                                    </span>{' '}
                                    -{' '}
                                    <span className="post-meta">
                                        <a
                                            onClick={this.onClickReply}
                                            title="reply"
                                        >
                                            {this.state.replying
                                                ? 'close'
                                                : 'reply'}
                                        </a>
                                    </span>
                                </div>
                            </div>

                            <div className="comment-resp">{obj.node.body}</div>

                            <div style={style} className="reply-form">
                                <form className="row">
                                    <div className="input-field col s12">
                                        <textarea
                                            value={
                                                this.state[
                                                    'comment_reply_' +
                                                        obj.node.id
                                                ]
                                            }
                                            onChange={this.handleChange}
                                            className="materialize-textarea"
                                            placeholder="Write a reply"
                                            id={'comment_reply_' + obj.node.id}
                                        />
                                    </div>
                                    <div className="col 12 input-field">
                                        <button
                                            onClick={e =>
                                                this.onCommentReply(
                                                    e,
                                                    'comment_reply_' +
                                                        obj.node.id,
                                                    obj.node.uuid
                                                )
                                            }
                                            type="submit"
                                            className="btn"
                                        >
                                            Publish
                                        </button>
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

                                <div className="comment-resp">
                                    {reply.node.body}
                                </div>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        );
    }
}

Comment.propTypes = {
    data: PropTypes.object.isRequired,
    handleComment: PropTypes.func.isRequired,
    handleReply: PropTypes.func.isRequired
};

export default Comment;
