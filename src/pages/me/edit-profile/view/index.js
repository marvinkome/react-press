/**
 * ./src/components/admin/edit-profile/view/body
 */

import React, { Component } from 'react';
import types from 'prop-types';

// import { createToast } from '../../../../lib/helpers';

import { EditPicture } from './editPicture';
import { EditDetails } from './editDetails';

export class Body extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitStateFromProps(props) || {
            display_name: '',
            description: '',
            pic_url: ''
        };
    }
    getInitStateFromProps = (props) => {
        if (props.data) {
            const { fullName, description, gravatarUrl } = props.data;

            return {
                display_name: fullName,
                description,
                pic_url: gravatarUrl
            };
        }
    };

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    afterUpload = (pic_url) => {
        this.setState(
            {
                pic_url
            },
            () => {
                this.props.handleNewProfilePic({ newPic: pic_url });
            }
        );
    };

    sortNewData = (data) => {
        let user_data = {};

        if (data !== undefined) {
            const { fullName, description } = data;
            const { display_name: newName, description: newDesc } = this.state;

            if (newName !== fullName) {
                user_data = {
                    ...user_data,
                    newName
                };
            }

            if (newDesc !== description) {
                user_data = {
                    ...user_data,
                    newDesc
                };
            }
        }

        return user_data;
    };

    onSaveClick = (e) => {
        e.preventDefault();

        if (this.props.data) {
            const user_data = this.sortNewData(this.props.data);
            this.props.handleNewProfile(user_data);
        }
    };

    render() {
        const { display_name, description, pic_url } = this.state;
        return (
            <div className="edit-profile">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m5 push-m7">
                            <EditPicture init_image={pic_url} afterUpload={this.afterUpload} />
                        </div>
                        <div className="col s12 m7 pull-m5">
                            <EditDetails
                                init_data={{ display_name, description }}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <button className="btn" onClick={this.onSaveClick}>
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    data: types.object.isRequired,
    handleNewProfile: types.func.isRequired,
    handleNewProfilePic: types.func.isRequired
};

export default Body;
