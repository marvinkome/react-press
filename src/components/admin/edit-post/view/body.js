/**
 * ./src/components/admin/new-post/view/body
 */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PostEditor from './editor';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { PostID } from '../../edit-post';
import { edit_post, create_tags } from '../../../../js/redux/actions';
import history from '../../../../js/history';

const mapStateToProps = (state) => ({
    data: state.user_data
});

const mapDispatchToProps = (dispatch) => ({
    edit_post: (data) => dispatch(edit_post(data)),
    create_tag: (data) => dispatch(create_tags(data))
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
            const data = np.data.data.user.posts.edges.find((obj) => obj.node.id == np.value);
            this.setState({
                title: data.node.title,
                post_pic_url: data.node.postPicUrl,
                body: data.node.body
            });
        }
        if (this.chipInstance != '' && np.data.data != undefined) {
            np.data.data.user.posts.edges
                .find((obj) => obj.node.id == np.value)
                .node.tags.edges.map((obj) =>
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
        if (this.props.data.data != undefined) {
            const data = this.props.data.data.user.posts.edges.find(
                (obj) => obj.node.id == this.props.value
            );
            this.setState({
                title: data.node.title,
                post_pic_url: data.node.postPicUrl,
                body: data.node.body
            });
        }
        if (this.chipInstance != '' && this.props.data.data != undefined) {
            this.props.data.data.user.posts.edges
                .find((obj) => obj.node.id == this.props.value)
                .node.tags.edges.map((obj) =>
                    this.chipInstance.addChip({
                        tag: obj.node.name
                    })
                );
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleEditor = (data) => {
        const orig_data = '<div>' + data + '</div>';
        this.setState({
            body: orig_data
        });
    };
    handleTagAdd = (tag) => {
        this.setState((prevState) => ({
            tags: [...prevState.tags, tag]
        }));
    };
    handleFileChange = (e) => {
        e.preventDefault();
        this.setState(
            {
                file: e.target.files[0]
            },
            () => this.onUploadClick(e)
        );
    };
    onUploadClick = () => {
        const ref = firebase
            .storage()
            .ref()
            .child('images/' + this.state.file.name);
        const task = ref.put(this.state.file);
        task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                const toastHTML = ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <span>Uploading... </span>
                    </div>
                );
                window.M.toast({
                    html: toastHTML,
                    displayLength: 4000
                });
            },
            () => {
                const toastHTML = ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <span>Can{'\''}t upload image </span>
                    </div>
                );
                window.M.toast({
                    html: toastHTML,
                    displayLength: 4000
                });
            },
            () => {
                this.setState({
                    post_pic_url: task.snapshot.downloadURL
                });
                const toastHTML = ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <span>Uploaded </span>
                    </div>
                );
                window.M.toast({
                    html: toastHTML,
                    displayLength: 4000
                });
            }
        );
    };
    onPublishClick = (e) => {
        e.preventDefault();
        let post_data = {};
        let new_tags = [];

        if (this.props.data.data != undefined) {
            const data = this.props.data.data.user.posts.edges.find(
                (obj) => obj.node.id == this.props.value
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
                new_tags = [...this.state.tags.slice(data.node.tags.edges.length)];
            }

            post_data = {
                ...post_data,
                postId: data.node.uuid
            };

            const toastHTML = ReactDOMServer.renderToStaticMarkup(
                <div>
                    <span>Saving... </span>
                </div>
            );
            window.M.toast({
                html: toastHTML,
                displayLength: 4000
            });

            this.props
                .edit_post(post_data)
                .then(() => {
                    new_tags.length != 0 &&
                        new_tags.map((tag_name) =>
                            this.props.create_tag({
                                tag_name,
                                post_id: data.node.uuid
                            })
                        );
                })
                .then(
                    () => {
                        const toastHTML = ReactDOMServer.renderToStaticMarkup(
                            <div ref={this.toast}>
                                <span>Post has been edited</span>
                            </div>
                        );
                        window.M.toast({
                            html: toastHTML,
                            displayLength: 4000
                        });
                        history.push('/admin/posts');
                    },
                    () => {
                        const toastHTML = ReactDOMServer.renderToStaticMarkup(
                            <div ref={this.toast}>
                                <span>Error: Can{'\''}t save</span>
                            </div>
                        );
                        window.M.toast({
                            html: toastHTML,
                            displayLength: 4000
                        });
                    }
                );
        }
    };
    render() {
        let data = null;
        if (this.props.data.data != undefined) {
            data = this.props.data.data.user.posts.edges.find(
                (obj) => obj.node.id == this.props.value
            ).node;
        }
        return (
            <div className="main admin-edit-post">
                <div className="post-form row">
                    <div className="col m8 s12">
                        <form>
                            <div className="input-field">
                                {this.props.data.data != undefined && (
                                    <input
                                        value={this.state.title}
                                        id="title"
                                        type="text"
                                        onChange={this.handleChange}
                                        placeholder="Enter Post Title"
                                    />
                                )}
                            </div>
                        </form>
                        {this.props.data.data != undefined && (
                            <PostEditor
                                current_body={data.body}
                                onStateChange={this.handleEditor}
                            />
                        )}
                    </div>
                    <div className="col m4 s12">
                        <div className="card">
                            <div className="card-content">
                                <div className="image-section">
                                    <span className="card-title">Add featured image</span>
                                    {this.props.data.data != undefined && (
                                        <img
                                            className="responsive-img"
                                            src={
                                                this.state.post_pic_url != ''
                                                    ? this.state.post_pic_url
                                                    : data.post_pic_url != undefined
                                                        ? data.post_pic_url
                                                        : ''
                                            }
                                        />
                                    )}
                                    <form>
                                        <div className="file-field input-field">
                                            <div className="btn btn-flat">
                                                <span>File</span>
                                                <input
                                                    type="file"
                                                    ref={this.fileInput}
                                                    onChange={this.handleFileChange}
                                                    accept="image/*"
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

                                <div className="tag-section">
                                    <span className="card-title">Add Tags</span>
                                    <div className="chips chips-placeholder" ref={this.chip} />
                                </div>
                            </div>
                            <div className="card-action center">
                                <button onClick={this.onPublishClick} className="btn publish">
                                    Publish
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

const BodyConsumer = (props) => (
    <PostID.Consumer>{(value) => <Body {...props} value={value} />}</PostID.Consumer>
);

export default connect(mapStateToProps, mapDispatchToProps)(BodyConsumer);
