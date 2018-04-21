/**
 * ./src/components/post/view/post-card
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostCard extends Component {
    render() {
        return (
            <div className="post">
                <div className="post-image">
                    <img
                        src={this.props.data.postPicUrl}
                        className="responsive-img"
                    />
                </div>
                <div className="post-content">
                    <h2 className="post-title">{this.props.data.title}</h2>
                    <div className="content">{this.props.data.body}</div>
                </div>

                <div className="post-footer">
                    {this.props.data.tags.edges.map(obj => (
                        <div key={obj.node.id} className="post-tag">
                            <a title={obj.node.name}>{obj.node.name}</a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

PostCard.propTypes = {
    data: PropTypes.object.isRequired
};

export default PostCard;
