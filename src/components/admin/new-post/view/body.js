/**
 * ./src/components/admin/new-post/view/body
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostEditor from './editor';
import { create_posts, create_tags } from '../../../../js/redux/actions';
import { upload_file } from '../../../../js/helpers';

const mapDispatchToProp = dispatch => ({
    create_post: data => dispatch(create_posts(data)),
    create_tag: data => dispatch(create_tags(data))
});

class Body extends Component {
    constructor(props) {
        super(props);
        this.chip = React.createRef();
        this.fileInput = React.createRef();

        this.state = {
            title: '',
            body: '',
            post_pic_url: '',
            file: '',
            tags: []
        };
    }
    componentDidMount() {
        const chip = this.chip.current;
        window.M.Chips.init(chip, {
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
            onChipAdd: e => {
                let tag = e[0].M_Chips.chipsData.pop();
                this.handleTagAdd(tag.tag);
            }
        });
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleEditor = data => {
        const orig_data = '<div>' + data + '</div>';
        this.setState({
            body: orig_data
        });
    };
    handleTagAdd = tag => {
        this.setState({
            tags: [...this.state.tags, tag]
        });
    };
    handleFileChange = e => {
        e.preventDefault();
        this.setState({
            file: e.target.files[0]
        });
    };
    onUploadClick = e => {
        e.preventDefault();
        upload_file(this.state.file).then(
            res =>
                res.msg == 'file uploaded' &&
                this.setState({
                    post_pic_url: 'http://192.168.43.200:5000' + res.url
                })
        );
    };
    onPublish = e => {
        e.preventDefault();
        const { post_pic_url, title, body, file } = this.state;

        if (post_pic_url == '' && file != '') {
            return alert('Please upload file before you continue');
        }

        if (title == '') {
            return alert('Title is required before you publish');
        }

        this.props
            .create_post({
                title,
                body,
                postPicUrl: post_pic_url
            })
            .then(res => {
                this.state.tags.map(tag_name =>
                    this.props.create_tag({
                        tag_name,
                        post_id: res.data.createPost.post.uuid
                    })
                );
            })
            .then(() =>
                this.setState({
                    title: '',
                    body: '',
                    post_pic_url: '',
                    file: '',
                    tags: []
                })
            );
    };
    render() {
        return (
            <div className="main admin-add-post">
                <div className="post-form row">
                    <div className="col m8 s12">
                        <form>
                            <div className="input-field">
                                <input
                                    value={this.state.title}
                                    id="title"
                                    type="text"
                                    placeholder="Enter Post Title"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </form>
                        <PostEditor onStateChange={this.handleEditor} />
                    </div>
                    <div className="col m4 s12">
                        <div className="publish-section card">
                            <div className="card-content">
                                <span className="card-title">Add Tags</span>
                                <div
                                    className="chips chips-placeholder"
                                    ref={this.chip}
                                />
                            </div>
                            <div className="card-action center">
                                <button
                                    onClick={this.onPublish}
                                    className="btn black"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                        <div className="image-section card">
                            <div className="card-content">
                                <span className="card-title">
                                    Add featured image
                                </span>
                                <img
                                    className="responsive-img"
                                    src={
                                        this.state.post_pic_url != '' &&
                                        this.state.post_pic_url
                                    }
                                />
                                <form>
                                    <div className="file-field input-field">
                                        <div className="btn btn-flat">
                                            <span>File</span>
                                            <input
                                                type="file"
                                                ref={this.fileInput}
                                                onChange={this.handleFileChange}
                                            />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input
                                                className="file-path validate"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-action center">
                                <button
                                    onClick={this.onUploadClick}
                                    className="btn black"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    create_post: PropTypes.func.isRequired,
    create_tag: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProp)(Body);
