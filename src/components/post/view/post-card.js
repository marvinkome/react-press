/**
 * ./src/components/post/view/post-card
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostCard extends Component {
    render() {
        return (
            <div className="post">
                <div className="post-content">
                    <h2 className="post-title">
                        {this.props.data.title}
                    </h2>
                    {(this.props.data.postPicUrl != undefined ||
                        this.props.data.postPicUrl != '') && (
                        <div className="post-image center">
                            <img
                                src={this.props.data.postPicUrl}
                                className="responsive-img"
                            />
                        </div>
                    )}
                    <div>
                        <div
                            className="content"
                            dangerouslySetInnerHTML={{
                                __html: this.props.data.body
                            }}
                        />
                    </div>
                </div>

                <div className="post-footer">
                    {this.props.data.tags.edges.map((obj) => (
                        <div key={obj.node.id} className="post-tag">
                            <span title={obj.node.name}>
                                {obj.node.name}
                            </span>
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
