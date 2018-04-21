/**
 * ./src/components/admin/edit-profile/view/body
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetch_user_data } from '../../../../js/redux/actions';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    fetch_data: () => dispatch(fetch_user_data())
});

class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display_name: '',
            description: '',
            file_path: '',
            choosen_file: ''
        };

        this.fileInput = React.createRef();
    }
    componentWillReceiveProps(np) {
        if (np.data.data != undefined) {
            const data = np.data.data.user;
            this.setState({
                display_name: data.fullName,
                description: data.description,
                file_path: data.gravatarUrl
            });
        }
    }
    componentDidMount() {
        this.props.fetch_data();
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleFileChange = e => {
        const url = window.URL.createObjectURL(e.target.files[0]);
        this.setState({
            choosen_file: url
        });
    };
    render() {
        return (
            <div className="main edit-profile">
                <div className="edit-picture z-depth-1">
                    <div className="heading">
                        <h5>Change Profile Picture</h5>
                        <p>* Recommended Ratio - 1:1 aspect ratio</p>
                    </div>
                    <div className="preview-cont center">
                        <div className="img-preview">
                            <img
                                className="responsive-img circle"
                                src={
                                    this.state.choosen_file != ''
                                        ? this.state.choosen_file
                                        : this.state.file_path
                                }
                            />
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
                                    <a className="btn-flat black white-text">
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
                                value={this.state.description}
                                placeholder="About you"
                                id="description"
                                className="materialize-textarea"
                            />
                        </div>
                        <div className="input-field center col s12">
                            <button className="btn-flat black white-text">
                                Submit
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
    fetch_data: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
