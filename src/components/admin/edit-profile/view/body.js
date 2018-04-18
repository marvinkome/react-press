/**
 * ./src/components/admin/edit-profile/view/body
 */

import React from 'react';

const Body = () => {
    return (
        <div className="main edit-profile">
            <div className="edit-picture z-depth-1">
                <div className="heading">
                    <h5>Change Profile Picture</h5>
                </div>
                <div className="preview-cont center">
                    <div className="img-preview">
                        <img
                            src="./src/img/pp.jpg"
                            className="responsive-img circle"
                        />
                    </div>
                </div>
                <div className="file-uploader">
                    <form className="row">
                        <div className="col s12 input-field file-field">
                            <div className="btn btn-flat">
                                <span>File</span>
                                <input type="file" />
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
                            placeholder="Display Name"
                            id="display_name"
                            type="text"
                        />
                    </div>
                    <div className="input-field col s12">
                        <textarea
                            placeholder="Description"
                            id="about"
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
};

export default Body;
