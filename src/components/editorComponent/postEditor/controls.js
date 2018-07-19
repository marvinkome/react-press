import React from 'react';
import types from 'prop-types';
import { MdTextFields, MdFormatBold } from 'react-icons/lib/md';
import { FaHeader, FaListUl, FaItalic } from 'react-icons/lib/fa';

const BLOCK_TYPES = [
    {
        label: 'list',
        style: 'unordered-list-item',
        element: <FaListUl />,
        extraStyle: ''
    },
    {
        label: 'sub-header',
        style: 'header-four',
        element: <MdTextFields />,
        extraStyle: 'md'
    },
    {
        label: 'header',
        style: 'header-three',
        element: <FaHeader />,
        extraStyle: ''
    }
];

const INLINE_STYLES = [
    {
        label: 'italic',
        style: 'ITALIC',
        element: <FaItalic />,
        extraStyle: ''
    },
    {
        label: 'bold',
        style: 'BOLD',
        element: <MdFormatBold />,
        extraStyle: 'md'
    }
];

export class LargeScreenControls extends React.Component {
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style, this.props.type);
    };
    render() {
        const control_name = this.props.control_name;
        let className = this.props.className + ' btn-floating';
        if (this.props.active) {
            className = className + ' active';
        }
        return (
            <li>
                <a className={className} title={control_name} onClick={this.onToggle}>
                    {this.props.render_icon}
                </a>
            </li>
        );
    }
}

export class SmallScreenControls extends React.Component {
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style, this.props.type);
    };
    render() {
        const control_name = this.props.control_name;

        return (
            <div className={this.props.active ? 'active' : ''}>
                <a className={this.props.className} title={control_name} onClick={this.onToggle}>
                    {this.props.render_icon}
                </a>
            </div>
        );
    }
}

export const Controls = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <React.Fragment>
            <div className="publish modal-trigger" href="#publish">
                <a className="btn btn-flat">Publish</a>
            </div>
            <ul className="fixed-block-controls">
                {BLOCK_TYPES.map((type) => (
                    <LargeScreenControls
                        key={type.label}
                        style={type.style}
                        control_name={type.label}
                        render_icon={type.element}
                        className={type.extraStyle}
                        active={type.style === blockType}
                        onToggle={onToggle}
                        type="block"
                    />
                ))}
                {INLINE_STYLES.map((type) => (
                    <LargeScreenControls
                        key={type.label}
                        style={type.style}
                        control_name={type.label}
                        render_icon={type.element}
                        className={type.extraStyle}
                        active={currentStyle.has(type.style)}
                        onToggle={onToggle}
                        type="inline"
                    />
                ))}
            </ul>
            <div className="bottom-bar">
                {BLOCK_TYPES.map((type) => (
                    <SmallScreenControls
                        key={type.label}
                        style={type.style}
                        control_name={type.label}
                        render_icon={type.element}
                        className={type.extraStyle}
                        active={type.style === blockType}
                        onToggle={onToggle}
                        type="block"
                    />
                ))}
                {INLINE_STYLES.map((type) => (
                    <SmallScreenControls
                        key={type.label}
                        style={type.style}
                        control_name={type.label}
                        render_icon={type.element}
                        className={type.extraStyle}
                        active={currentStyle.has(type.style)}
                        onToggle={onToggle}
                        type="inline"
                    />
                ))}
                <a className="btn btn-flat modal-trigger" href="#publish">
                    Publish
                </a>
            </div>
        </React.Fragment>
    );
};

LargeScreenControls.propTypes = {
    control_name: types.string.isRequired,
    render_icon: types.element.isRequired,
    className: types.string.isRequired,
    active: types.bool.isRequired,
    onToggle: types.func.isRequired,
    type: types.string.isRequired,
    style: types.string.isRequired
};

SmallScreenControls.propTypes = {
    control_name: types.string.isRequired,
    render_icon: types.element.isRequired,
    className: types.string.isRequired,
    active: types.bool.isRequired,
    onToggle: types.func.isRequired,
    type: types.string.isRequired,
    style: types.string.isRequired
};

Controls.propTypes = {
    editorState: types.object.isRequired,
    onToggle: types.func.isRequired
};
