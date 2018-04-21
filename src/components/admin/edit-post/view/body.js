/**
 * ./src/components/admin/new-post/view/body
 */

import React, { Component } from 'react';
import PostEditor from './editor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostID } from '../../edit-post';
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
        this.chip = React.createRef();
        this.fileInput = React.createRef();
        this.chipInstance = '';
        this.state = {
            title: '',
            body: '',
            tags: [],
            file_path: '',
            choosen_file: ''
        };
    }
    componentWillReceiveProps(np) {
        if (np.data.data != undefined) {
            const data = np.data.data.user.posts.edges.find(
                obj => obj.node.id == np.value
            );
            this.setState({
                title: data.node.title,
                tags: data.node.tags.edges,
                file_path: data.node.postPicUrl,
                body: data.node.body
            });
        }
    }
    componentDidMount() {
        const chip = this.chip.current;
        this.chipInstance = window.M.Chips.init(chip, {
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag'
        });
        this.props.fetch_data();
    }
    componentDidUpdate() {
        if (this.chipInstance != '' && this.state.tags.length != 0) {
            this.state.tags.map(obj =>
                this.chipInstance.addChip({
                    tag: obj.node.name
                })
            );
        }
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
    handleSubmit = e => {
        e.preventDefault();
        alert('selected file - ' + this.fileInput.current.files[0].size);
    };
    handleFileChange = e => {
        const url = window.URL.createObjectURL(e.target.files[0]);
        this.setState({
            choosen_file: url
        });
    };
    render() {
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
                                current_body={this.state.body}
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
                                <button className="btn black">Publish</button>
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
                                        this.state.choosen_file != ''
                                            ? this.state.choosen_file
                                            : this.state.file_path
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
                                            <input
                                                type="hidden"
                                                value={this.state.file_path}
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
                                    onClick={this.handleSubmit}
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
    fetch_data: PropTypes.func.isRequired
};

const BodyConsumer = props => (
    <PostID.Consumer>
        {value => <Body {...props} value={value} />}
    </PostID.Consumer>
);

export default connect(mapStateToProps, mapDispatchToProps)(BodyConsumer);
