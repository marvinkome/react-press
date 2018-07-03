import React from 'react';
import types from 'prop-types';

export class EditDetails extends React.Component {
    render() {
        return (
            <div className="edit-text">
                <form className="row">
                    <div className="input-field col s12">
                        <input
                            placeholder="Your Name"
                            id="display_name"
                            type="text"
                            value={this.props.init_data.display_name || ''}
                            onChange={this.props.onChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <textarea
                            placeholder="Add a short description about yourself"
                            id="description"
                            className="materialize-textarea"
                            value={this.props.init_data.description || ''}
                            onChange={this.props.onChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

EditDetails.propTypes = {
    init_data: types.object.isRequired,
    onChange: types.func.isRequired
};
