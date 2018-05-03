/**
 * ./src/components/admin/edit-profile/view/body
 */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
    fetch_all_data,
    fetch_user_data,
    update_profile_pic,
    update_user_info
} from '../../../../js/redux/actions';
import { gcd } from '../../../../js/helpers';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    fetch_user_data: () => dispatch(fetch_user_data()),
    fetch_data: () => dispatch(fetch_all_data()),
    update_profile_pic: data => dispatch(update_profile_pic(data)),
    update_user_info: data => dispatch(update_user_info(data))
});

class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display_name: '',
            description: '',
            file: '',
            pic_url: '',
            image_ratio: ''
        };

        this.fileInput = React.createRef();
    }
    componentWillReceiveProps(np) {
        if (np.data.data != undefined) {
            const data = np.data.data.user;
            this.setState({
                display_name: data.fullName,
                description: data.description,
                pic_url: data.gravatarUrl
            });
        }
    }
    componentDidMount() {
        if (this.props.data.data != undefined) {
            const data = this.props.data.data.user;
            this.setState({
                display_name: data.fullName,
                description: data.description,
                pic_url: data.gravatarUrl
            });
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleFileChange = e => {
        e.preventDefault();

        if (e.target.files.length > 0) {
            this.setState({
                file: e.target.files[0]
            });

            const objectURL = window.URL.createObjectURL(e.target.files[0]);
            const img = new Image();

            img.onload = () => {
                const gcd_res = gcd(img.width, img.height);
                const ratio =
                    String(img.width / gcd_res) +
                    ':' +
                    String(img.height / gcd_res);
                this.setState({
                    image_ratio: ratio
                });
            };
            img.src = objectURL;
        }
    };
    onUploadClick = e => {
        e.preventDefault();

        if (this.props.data.data != undefined && navigator.onLine) {
            if (this.state.file == '') {
                return alert('Please choose a file');
            }

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
                            <span>File is uploading please wait </span>
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
                        pic_url: task.snapshot.downloadURL
                    });

                    if (
                        this.state.pic_url ==
                        this.props.data.data.user.gravatarUrl
                    ) {
                        return alert('Please choose a different file');
                    }

                    const user_data = this.props.data.data.user;
                    const data = {
                        pic_url: this.state.pic_url,
                        user_id: user_data.uuid
                    };
                    this.props
                        .update_profile_pic(data)
                        .then(() => this.props.fetch_user_data())
                        .then(() => this.props.fetch_data())
                        .then(() => {
                            const toastHTML = ReactDOMServer.renderToStaticMarkup(
                                <div ref={this.toast}>
                                    <span>Changes saved</span>
                                </div>
                            );
                            window.M.toast({
                                html: toastHTML,
                                displayLength: 4000
                            });
                        });
                }
            );
        } else {
            const toastHTML = ReactDOMServer.renderToStaticMarkup(
                <div>
                    <span>
                        Can{'\''}t upload image, make sure you{'\''}re online
                    </span>
                </div>
            );
            window.M.toast({
                html: toastHTML,
                displayLength: 4000
            });
        }
    };
    onSaveClick = e => {
        e.preventDefault();
        let user_data = {};
        if (this.props.data.data != undefined) {
            const data = this.props.data.data.user;
            if (this.state.display_name != data.fullName) {
                user_data = {
                    ...user_data,
                    full_name: this.state.display_name
                };
            }

            if (this.state.description != data.description) {
                user_data = {
                    ...user_data,
                    description: this.state.description
                };
            }

            user_data = {
                ...user_data,
                user_id: data.uuid
            };

            this.props
                .update_user_info(user_data)
                .then(() => this.props.fetch_user_data())
                .then(() => this.props.fetch_data())
                .then(
                    () => {
                        const toastHTML = ReactDOMServer.renderToStaticMarkup(
                            <div ref={this.toast}>
                                <span>Changes saved</span>
                            </div>
                        );
                        window.M.toast({
                            html: toastHTML,
                            displayLength: 4000
                        });
                    },
                    () => {
                        const toastHTML = ReactDOMServer.renderToStaticMarkup(
                            <div ref={this.toast}>
                                <span>can{'\''}t save data</span>
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
        return (
            <div className="main edit-profile">
                <div className="edit-picture z-depth-1">
                    <div className="heading">
                        <h5>Change Profile Picture</h5>
                        <p
                            className={
                                this.state.image_ratio != '' &&
                                this.state.image_ratio != '1:1'
                                    ? 'red-text'
                                    : undefined
                            }
                        >
                            * Recommended Ratio - 1:1 aspect ratio
                        </p>
                    </div>
                    <div className="preview-cont center">
                        <div className="img-preview">
                            {this.state.pic_url ? (
                                <img
                                    className="responsive-img circle"
                                    src={this.state.pic_url}
                                />
                            ) : (
                                'No Profile picture'
                            )}
                        </div>
                    </div>
                    <div className="file-uploader">
                        <form className="row">
                            <div className="col s12 input-field file-field">
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
                                        placeholder="Choose File"
                                        className="file-path validate"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="col input-field s12">
                                <div className="submit-btn">
                                    <a
                                        className={
                                            this.state.image_ratio != '' &&
                                            this.state.image_ratio != '1:1'
                                                ? 'btn-flat disabled'
                                                : 'btn-flat'
                                        }
                                        onClick={this.onUploadClick}
                                    >
                                        <span>Upload</span>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="edit-text z-depth-1">
                    <div className="heading">
                        <h5>Change Personal Info</h5>
                    </div>
                    <form className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={this.handleChange}
                                value={this.state.display_name}
                                placeholder="Display Name"
                                id="display_name"
                                type="text"
                            />
                        </div>
                        <div className="input-field col s12">
                            <textarea
                                onChange={this.handleChange}
                                value={this.state.description || ''}
                                placeholder="About you"
                                id="description"
                                className="materialize-textarea"
                            />
                        </div>
                        <div className="input-field center col s12">
                            <button
                                onClick={this.onSaveClick}
                                className="btn-flat"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    data: PropTypes.object.isRequired,
    fetch_user_data: PropTypes.func.isRequired,
    fetch_data: PropTypes.func.isRequired,
    update_profile_pic: PropTypes.func.isRequired,
    update_user_info: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
