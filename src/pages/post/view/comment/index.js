/**
 * ./src/components/post/view/comment
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentForm from './commentForm';
import Comment from './comments';

class MainComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            data: this.props.data
        };
    }
    componentWillReceiveProps = (np) => {
        if (this.state.data != np.data) {
            this.setState({
                data: np.data
            });
        }
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    onClickReply = (e, id) => {
        e.preventDefault();
        this.setState({
            ['replying' + id]: !this.state['replying' + id]
        });
    };
    onCommentPublish = (e) => {
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
        this.setState(
            {
                [id]: ''
            },
            () => this.onClickReply
        );
    };
    render() {
        return (
            <div className="response">
                <h5>Responses</h5>

                <div className="resp-form">
                    <CommentForm
                        value={this.state.comment}
                        onChange={this.handleChange}
                        onPublish={this.onCommentPublish}
                        id="comment"
                        placeholder="Write a response"
                    />
                </div>

                {this.state.data.edges.map((obj) => (
                    <Comment
                        key={obj.node.id}
                        comment={obj}
                        onClickReply={this.onClickReply}
                        replying={this.state['replying' + obj.node.id]}
                        reply_value={this.state['comment_reply_' + obj.node.id]}
                        handleReplyChange={this.handleChange}
                    />
                ))}
            </div>
        );
    }
}

MainComment.propTypes = {
    data: PropTypes.object.isRequired,
    handleComment: PropTypes.func.isRequired,
    handleReply: PropTypes.func.isRequired
};

export default MainComment;
