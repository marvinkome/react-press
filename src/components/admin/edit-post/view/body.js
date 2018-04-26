/**
 * ./src/components/admin/new-post/view/body
 */

import React, { Component } from 'react';
import PostEditor from './editor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostID } from '../../edit-post';
import { edit_post, create_tags } from '../../../../js/redux/actions';
import { upload_file } from '../../../../js/helpers';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    edit_post: data => dispatch(edit_post(data)),
    create_tag: data => dispatch(create_tags(data))
});

class Body extends Component {
    constructor(props) {
        super(props);
        this.chip = React.createRef();
        this.fileInput = React.createRef();
        this.chipInstance = '';

        this.state = {
            title: '',
            body: '',
            post_pic_url: '',
            tags: [],
            file: ''
        };
    }
    componentWillReceiveProps(np) {
        if (np.data.data != undefined) {
            const data = np.data.data.user.posts.edges.find(
                obj => obj.node.id == np.value
            );
            this.setState({
                title: data.node.title,
                post_pic_url: data.node.postPicUrl,
                body: data.node.body
            });
        }
        if (this.chipInstance != '' && np.data.data != undefined) {
            np.data.data.user.posts.edges
                .find(obj => obj.node.id == np.value)
                .node.tags.edges.map(obj =>
                    this.chipInstance.addChip({
                        tag: obj.node.name
                    })
                );
        }
    }
    componentDidMount() {
        const chip = this.chip.current;
        this.chipInstance = window.M.Chips.init(chip, {
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
            onChipAdd: () => {
                let tag = this.chipInstance.chipsData;
                this.handleTagAdd(tag[tag.length - 1].tag);
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
        this.setState(prevState => ({
            tags: [...prevState.tags, tag]
        }));
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
    onPublishClick = e => {
        e.preventDefault();
        let post_data = {};
        let new_tags = [];

        if (this.props.data.data != undefined) {
            const data = this.props.data.data.user.posts.edges.find(
                obj => obj.node.id == this.props.value
            );

            if (this.state.title != data.node.title) {
                post_data = {
                    ...post_data,
                    title: this.state.title
                };
            }

            if (this.state.body != data.node.body) {
                post_data = {
                    ...post_data,
                    body: this.state.body
                };
            }

            if (this.state.post_pic_url != data.node.postPicUrl) {
                post_data = {
                    ...post_data,
                    postPicUrl: this.state.post_pic_url
                };
            }

            if (this.state.tags.length > data.node.tags.edges.length) {
                new_tags = [
                    ...this.state.tags.slice(data.node.tags.edges.length)
                ];
            }

            post_data = {
                ...post_data,
                postId: data.node.uuid
            };

            this.props.edit_post(post_data);
            new_tags.length != 0 &&
                new_tags.map(tag_name =>
                    this.props.create_tag({
                        tag_name,
                        post_id: data.node.uuid
                    })
                );
        }
    };
    render() {
        let data = null;
        if (this.props.data.data != undefined) {
            data = this.props.data.data.user.posts.edges.find(
                obj => obj.node.id == this.props.value
            ).node.body;
        }
        return (
            <div className="main admin-edit-post">
                <div className="post-form row">
                    <div className="col m8 s12">
                        <form>
                            <div className="input-field">
                                <input
                                    value={this.state.title}
                                    id="title"
                                    type="text"
                                    onChange={this.handleChange}
                                    placeholder="Enter Post Title"
                                />
                            </div>
                        </form>
                        {this.props.data.data != undefined && (
                            <PostEditor
                                current_body={data}
                                onStateChange={this.handleEditor}
                            />
                        )}
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
                                    onClick={this.onPublishClick}
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
                                        this.state.post_pic_url != ''
                                            ? this.state.post_pic_url
                                            : undefined
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
                                                placeholder="Choose file to upload"
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
    data: PropTypes.object.isRequired,
    create_tag: PropTypes.func.isRequired,
    edit_post: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

const BodyConsumer = props => (
    <PostID.Consumer>
        {value => <Body {...props} value={value} />}
    </PostID.Consumer>
);

export default connect(mapStateToProps, mapDispatchToProps)(BodyConsumer);
