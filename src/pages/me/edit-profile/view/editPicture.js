import React from 'react';
import types from 'prop-types';
import { upload_file, createToast, gcd } from '../../../../lib/helpers';

export class EditPicture extends React.Component {
    handleSelectFile = (e) => {
        e.preventDefault();
        this.setState({
            file: e.target.files[0]
        });

        const objectURL = window.URL.createObjectURL(e.target.files[0]);
        const img = new Image();

        img.onload = () => {
            const gcd_res = gcd(img.width, img.height);
            const ratio = String(img.width / gcd_res) + ':' + String(img.height / gcd_res);

            if (ratio != '' && ratio != '1:1') {
                return createToast('Image ratio must be 1:1');
            }
        };
        img.src = objectURL;

        this.handleFileUpload(e.target.files[0]);
    };
    handleFileUpload = async (file) => {
        const task = await upload_file(
            file,
            null,
            () => createToast('Your image couldn\'t be uploaded'),
            null
        );

        this.props.afterUpload(task.downloadURL);
    };
    render() {
        let user_image = this.props.init_image;
        if (user_image == null || user_image == '' || user_image == undefined) {
            user_image = '/static/default-pic.png';
        }
        return (
            <div className="edit-picture">
                <div className="preview-cont center">
                    <div className="img-preview">
                        <img className="responsive-img circle" src={user_image} />
                    </div>
                </div>

                <div className="file-uploader">
                    <form>
                        <div className="input-field file-field">
                            <div className="btn">
                                <span>Choose image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.handleSelectFile}
                                />
                            </div>

                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

EditPicture.propTypes = {
    afterUpload: types.func.isRequired,
    init_image: types.string
};
