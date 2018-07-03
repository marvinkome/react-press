import React from 'react';
import types from 'prop-types';
import { MdClose } from 'react-icons/lib/md';
import { all_tags, upload_file, createToast } from '../../../lib/helpers';

export default class PublishModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chips: [...props.init_tags],
            tagName: '',
            err_text: ''
        };

        this.modal = React.createRef();
        this.modalIns;
    }
    // componentWillReceiveProps(props) {
    //     if (props.init_tags.length > 0) {
    //         this.setState({
    //             chips: props.init_tags
    //         });
    //     }
    // }
    componentDidMount() {
        const modal = this.modal.current;
        this.modalIns = window.M.Modal.init(modal);
    }
    componentWillUnmount() {
        if (this.modalIns !== undefined) {
            this.modalIns.close();
            this.modalIns.destroy();
        }
    }
    closeTag = (item, item_index) => {
        const tag = this.state.chips.find((obj, index) => obj.tag === item && index === item_index);
        this.setState({
            chips: this.state.chips.filter((obj) => obj !== tag)
        });
    };
    onChange = (e) => {
        this.setState({
            tagName: e.target.value
        });
        this.setState({
            err_text: ''
        });
    };
    onChipAdd = (e) => {
        if (e.which === 13) {
            if (all_tags.indexOf(this.state.tagName.toLowerCase()) === -1) {
                this.setState({
                    err_text: 'Invalid tag'
                });

                return;
            }

            if (this.state.chips.length !== 3) {
                this.setState({
                    chips: [
                        ...this.state.chips,
                        {
                            tag: this.state.tagName
                        }
                    ],
                    tagName: ''
                });
            }
        }
    };
    handleSelectFile = (e) => {
        e.preventDefault();
        this.handleFileUpload(e.target.files[0]);
    };
    handleFileUpload = async (file) => {
        const task = await upload_file(
            file,
            () => createToast('Uploading...'),
            () => createToast('Can\'t upload image try again'),
            () => createToast('Upload successful')
        );

        this.props.afterUpload(task.downloadURL);
    };
    handlePublish = (e) => {
        e.preventDefault();
        this.props.onPublish(this.state.chips);
    };
    render_tag = (item, index) => (
        <div className="chip" key={index}>
            {item.tag}
            <a onClick={() => this.closeTag(item.tag, index)}>
                <MdClose />
            </a>
        </div>
    );
    render() {
        return (
            <div className="modal modal-fixed-footer" id="publish" ref={this.modal}>
                <div className="modal-content">
                    <h4>Ready to publish?</h4>

                    <div className="add-featured-image">
                        <p>
                            Add a high resolution image to your story to capture people’s interest
                        </p>
                        <div>
                            <form>
                                <div className="file-field input-field">
                                    <div className="btn btn-flat">
                                        Select featured image
                                        <input
                                            type="file"
                                            onChange={this.handleSelectFile}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="tag">
                        <div>
                            <p>
                                Add (up to 3) tags to let your readers know what the post is about
                            </p>
                            <span>Accepted tags are: Tech, Science, Culture, Art, Media</span>
                        </div>

                        <div className="chips input-field">
                            {this.state.chips.map((item, index) => this.render_tag(item, index))}
                            <input
                                placeholder="Add tag"
                                className="input"
                                onKeyPress={this.onChipAdd}
                                onChange={this.onChange}
                                value={this.state.tagName}
                            />
                        </div>

                        <span className="red-text">{this.state.err_text}</span>
                    </div>
                </div>

                <div className="modal-footer">
                    <a className="modal-close waves-effect btn-flat">close</a>
                    <a className="waves-effect btn" onClick={this.handlePublish}>
                        Publish
                    </a>
                </div>
            </div>
        );
    }
}

PublishModal.propTypes = {
    afterUpload: types.func.isRequired,
    onPublish: types.func.isRequired,
    init_tags: types.array
};
