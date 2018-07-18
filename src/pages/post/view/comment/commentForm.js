import React from 'react';
import types from 'prop-types';

const CommentForm = ({ value, id, placeholder, onChange, onPublish }) => {
    return (
        <form className="row">
            <div className="input-field col s12">
                <textarea
                    value={value}
                    id={id}
                    className="materialize-textarea"
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className="col 12 input-field">
                <button onClick={onPublish} type="submit" className="btn">
                    Publish
                </button>
            </div>
        </form>
    );
};

CommentForm.propTypes = {
    value: types.string,
    id: types.string,
    placeholder: types.string,
    onChange: types.func,
    onPublish: types.func
};

export default CommentForm;
