/**
 * ./src/components/admin/new-post/view/body
 */

import React, { Component } from 'react';
import PostEditor from './editor';

class Body extends Component {
    constructor(props) {
        super(props);
        this.chip = React.createRef();
    }
    componentDidMount() {
        const chip = this.chip.current;
        window.M.Chips.init(chip, {
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag'
        });
    }
    render() {
        return (
            <div className="main admin-edit-post">
                <div className="post-form row">
                    <div className="col m8 s12">
                        <form>
                            <div className="input-field">
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Enter Post Title"
                                />
                            </div>
                        </form>
                        <PostEditor />
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
                                <form>
                                    <div className="file-field input-field">
                                        <div className="btn btn-flat">
                                            <span>File</span>
                                            <input type="file" />
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
                                <button className="btn black">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;
