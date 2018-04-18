/**
 * ./src/components/admin/new-post/view/editor
 */

import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Controls } from './controls';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.editor = React.createRef();
    }
    componentDidMount = () => {
        this.editorFocus();
    };
    editorFocus = () => {
        const editor = this.editor.current;
        editor.focus();
    };
    onChange = editorState => {
        this.setState({
            editorState
        });
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
            this.onChange(
                RichUtils.toggleBlockType(this.state.editorState, command)
            );
        } else if (type == 'inline') {
            this.onChange(
                RichUtils.toggleInlineStyle(this.state.editorState, command)
            );
        }
    };
    render() {
        return (
            <div className="editor z-depth-1">
                <Controls
                    editorState={this.state.editorState}
                    onToggle={this.toggleCommand}
                />
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
                    <p>Word Count: 10</p>
                </div>
            </div>
        );
    }
}

export default PostEditor;
