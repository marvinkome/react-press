/**
 * ./src/components/admin/new-post/view/editor
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    ContentState,
    convertFromHTML
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { validate_html } from '../../../../js/helpers';
import { Controls } from './controls';
import { count_words_in_html } from '../../../../js/helpers';

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word_length: 0,
            editorState: EditorState.createEmpty()
        };

        this.editor = React.createRef();
    }
    componentDidMount = () => {
        let contentState;
        let editorState;

        if (validate_html(this.props.current_body)) {
            const blockFromHtml = convertFromHTML(this.props.current_body);
            contentState = ContentState.createFromBlockArray(
                blockFromHtml.contentBlocks,
                blockFromHtml.entityMap
            );
        } else {
            contentState = ContentState.createFromText(this.props.current_body);
        }
        const word_length = count_words_in_html(this.props.current_body);
        editorState = EditorState.push(this.state.editorState, contentState);
        editorState = EditorState.moveFocusToEnd(editorState);

        this.setState({
            word_length,
            editorState
        });
    };
    editorFocus = () => {
        const editor = this.editor.current;
        editor.focus();
    };
    onChange = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(rawContentState);
        const word_length = count_words_in_html(html);

        this.setState({
            editorState,
            word_length
        });
        this.props.onStateChange(html);
    };
    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };
    toggleCommand = (e, command, type) => {
        if (type == 'block') {
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, command));
        } else if (type == 'inline') {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, command));
        }
    };
    render() {
        return (
            <div className="editor z-depth-1">
                <Controls editorState={this.state.editorState} onToggle={this.toggleCommand} />
                <div className="editor-input" onClick={this.editorFocus}>
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        ref={this.editor}
                        spellCheck
                    />
                </div>
                <div className="editor-infos">
                    <p>Word Count: {this.state.word_length}</p>
                </div>
            </div>
        );
    }
}

PostEditor.propTypes = {
    onStateChange: PropTypes.func.isRequired,
    current_body: PropTypes.string.isRequired
};

export default PostEditor;
