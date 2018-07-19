import React from 'react';
import types from 'prop-types';
import { all_tags, upload_file, createToast } from '../../../lib/helpers';

export default class PublishModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTopic: props.init_tag || ''
        };

        this.modal = React.createRef();
        this.select = React.createRef();
    }

    componentDidMount() {
        const modal = this.modal.current;
        const select = this.select.current;

        this.selectIns = window.M.FormSelect.init(select);
        this.modalIns = window.M.Modal.init(modal);
    }

    componentWillUnmount() {
        if (this.modalIns !== undefined) {
            this.modalIns.close();
            this.modalIns.destroy();
        }

        if (this.selectIns !== undefined) {
            this.selectIns.destroy();
        }
    }

    onChange = (e) => {
        e.preventDefault();

        this.setState({
            selectedTopic: e.target.value
        });
    }

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
        this.props.onPublish(this.state.selectedTopic);
    };

    render() {
        return (
            <div className="modal modal-fixed-footer" id="publish" ref={this.modal}>
                <div className="modal-content">
                    <h4>Ready to publish?</h4>

                    <div className="add-featured-image">
                        <p>Add a high resolution image to your post to capture people’s interest</p>
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
                            <p>Select a topic that fits your post</p>
                        </div>

                        <div className="select input-field">
                            <select 
                                value={this.state.selectedTopic} 
                                onChange={this.onChange} ref={this.select}>
                                <option value="" disabled>Choose Topic</option>
                                {all_tags.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
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
    init_tag: types.string
};
