import React from 'react';
import types from 'prop-types';
import ContentEditor from './editor';
import PublishModal from './publishModal';
import { Consumer } from '../index';
import { sanitize_html } from '../../../lib/helpers';

export class EditorForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_title: props.data ? props.data.post.title : '',
            postPicUrl: '',
            post_content: ''
        };
    }

    onInputChange = (e) => {
        // handle title change
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onContentChange = (post_content) => {
        // handle content change
        this.setState({
            post_content
        });
    };

    afterUpload = (postPicUrl) => {
        // handle postPicUrl
        this.setState({
            postPicUrl
        });
    };

    sortOutNewData = (tag) => {
        // sort out new data during post edit
        let post_data = {};

        if (this.props.data) {
            const { title, body, postPicUrl, uuid } = this.props.data.post;

            // check for title change
            if (this.state.post_title !== title) {
                post_data = {
                    ...post_data,
                    title: this.state.post_title
                };
            }

            // check for content change
            if (sanitize_html(this.state.post_content) !== body) {
                post_data = {
                    ...post_data,
                    body: sanitize_html(this.state.post_content)
                };
            }

            if (this.state.postPicUrl !== postPicUrl && this.state.postPicUrl !== '') {
                post_data = {
                    ...post_data,
                    postPicUrl: this.state.postPicUrl
                };
            }

            if (this.props.data.post.tag === null || tag !== this.props.data.post.tag.name) {
                post_data = {
                    ...post_data,
                    tag
                };
            }

            post_data = {
                ...post_data,
                postId: uuid
            };
        }

        return post_data;
    };

    onPublishClick = (topic) => {
        // get post data from state
        const { post_title, post_content, postPicUrl } = this.state;

        // post title is required so alert if it isn't giving
        if (!post_title.length) {
            return alert('Title is required before you publish');
        }

        // check if its edit post page
        if (this.props.data && this.props.data.title !== '') {
            // then sort out the new data
            const post_data = this.sortOutNewData(topic);

            this.props.publishPost(post_data, true);
        } else {
            // it's new post page
            const postData = {
                title: post_title,
                body: sanitize_html(post_content),
                postPicUrl,
                topic
            };
            this.props.publishPost(postData, false);
        }
    };

    render() {
        let init_body = null;
        let init_tag = null;

        if (this.props.data && this.props.data.post) {
            const { body, tag } = this.props.data.post;
            init_body = body;

            if (tag) init_tag = tag.name;
        }

        return (
            <div className="editor-bg">
                <div className="editor-cont">
                    <div className="title-input">
                        <div className="input-field">
                            <input
                                placeholder="Post Title"
                                id="post_title"
                                type="text"
                                onChange={this.onInputChange}
                                value={this.state.post_title}
                            />
                        </div>
                    </div>
                    <div className="content-input">
                        <ContentEditor init_body={init_body} onChange={this.onContentChange} />
                        <PublishModal
                            afterUpload={this.afterUpload}
                            onPublish={this.onPublishClick}
                            init_tag={init_tag}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

EditorForm.propTypes = {
    publishPost: types.func,
    data: types.object
};

const ContextConsumer = (props) => (
    <Consumer>{(publish) => <EditorForm {...props} publishPost={publish} />}</Consumer>
);

export default ContextConsumer;
