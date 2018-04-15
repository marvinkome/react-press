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
                <li className="collection-item avatar">
                    <img src="./src/img/pp.jpg" alt="" className="circle" />
                    <a>
                        <span className="title">
                            {obj.node.author.fullName}
                        </span>
                    </a>
                    <div className="comment-resp">{obj.node.body}</div>
                    <a href="#!" className="secondary-content">
                        {format_date(obj.node.timestamp)}
                    </a>
                </li>
                {obj.node.replies.edges.map(reply => (
                    <li
                        key={reply.node.uuid}
                        className="collection-item avatar"
                    >
                        <img src="./src/img/pp.jpg" alt="" className="circle" />
                        <a>
                            <span className="title">
                                {reply.node.author.fullName}
                            </span>
                        </a>
                        <div className="comment-resp">{reply.node.body}</div>
                        <a href="#!" className="secondary-content">
                            {format_date(reply.node.timestamp)}
                        </a>
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
