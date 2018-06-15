import React from 'react';
import types from 'prop-types';
import ContentEditor from './editor';
import PublishModal from './publishModal';
import { Consumer } from '../body';
import { sanitize_html } from '../../../../../js/helpers';

export class EditorForm extends React.Component {
    constructor() {
        super();

        this.state = {
            post_title: '',
            post_content: '',
            postPicUrl: ''
        };
    }
    static getDerivedStateFromProps(props) {
        if (props.data !== undefined) {
            const { title } = props.data;
            return {
                post_title: title || ''
            };
        }
    }
    onInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    onContentChange = (content) => {
        const data = `<div>${content}</div>`;
        this.setState({
            post_content: data
        });
    };
    afterUpload = (postPicUrl) => {
        this.setState({
            postPicUrl
        });
    };
    sortOutNewData = (current_tags) => {
        let post_data = {};
        let new_tags = [];

        if (this.props.data !== undefined) {
            const { title, body, pic_url, tags, uuid } = this.props.data;

            if (this.state.post_title !== title) {
                post_data = {
                    ...post_data,
                    title: this.state.post_title
                };
            }

            if (this.state.post_content !== body) {
                post_data = {
                    ...post_data,
                    body: sanitize_html(this.state.post_content)
                };
            }

            if (this.state.postPicUrl !== pic_url) {
                post_data = {
                    ...post_data,
                    postPicUrl: this.state.postPicUrl
                };
            }

            if (current_tags.length > tags.length) {
                new_tags = [...current_tags.slice(tags.length)];
            }

            post_data = {
                ...post_data,
                postId: uuid
            };
        }

        return {
            new_tags,
            post_data
        };
    };
    onPublishClick = (tags) => {
        const { post_title, post_content, postPicUrl } = this.state;
        if (post_title.length <= 0) {
            return alert('Title is required before you publish');
        }
        

        if (this.props.data.title !== '') {
            const { post_data, new_tags } = this.sortOutNewData(tags);

            this.props.publishPost(post_data, new_tags, true);
        } else {
            const postData = {
                title: post_title,
                body: sanitize_html(post_content),
                postPicUrl
            };
            this.props.publishPost(postData, tags);
        }
    };
    render() {
        let init_body = null;
        let init_tags = [];

        if (this.props.data !== undefined) {
            const { body, tags } = this.props.data;
            init_body = body;
            init_tags = tags;
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
                            init_tags={init_tags}
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
