/**
 * ./app/component/admin/new-post/view/controls
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StyleButton extends Component {
    constructor() {
        super();
    }
    onToggle = e => {
        e.preventDefault();
        this.props.onToggle(e, this.props.style, this.props.type);
    };
    render() {
        let className = 'fa fa-' + this.props.label;
        if (this.props.active) {
            className += ' active';
        }
        return (
            <button className="btn-flat" onClick={this.onToggle}>
                <i className={className} />
            </button>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'header', style: 'header-five' },
    { label: 'quote-left', style: 'blockquote' },
    { label: 'list-ul', style: 'ordered-list-item' }
];

const INLINE_STYLES = [
    { label: 'bold', style: 'BOLD' },
    { label: 'italic', style: 'ITALIC' },
    { label: 'underline', style: 'UNDERLINE' }
];

export const Controls = props => {
    const { editorState } = props;
    const currentStyle = props.editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div className="editor-controls">
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    type="block"
                />
            ))}
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    type="inline"
                />
            ))}
        </div>
    );
};

StyleButton.propTypes = {
    onToggle: PropTypes.func.isRequired,
    style: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

Controls.propTypes = {
    editorState: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired
};
