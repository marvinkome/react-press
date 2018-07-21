/**
 * ./src/components/admin/new-post/view/editor
 */

import React, { Component } from 'react';
import types from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState, RichUtils, convertFromHTML, ContentState } from 'draft-js';

import { Controls } from './controls';
import { validate_html } from '../../../lib/helpers';

export default class ContentEditor extends Component {
    constructor(props) {
        super(props);

        // set supported styles for markdown
        const supported_styles = {
            block: ['CODE', 'blockquote', 'header-two', 'header-three', 'unordered-list-item']
        };

        const markdownPlugin = createMarkdownPlugin({
            features: supported_styles
        });

        this.state = {
            editor: false, // intialize editor only on client side

            // initialy create empty editor fill with content if any
            editorState: EditorState.createEmpty(),

            plugins: [markdownPlugin]
        };

        this.editor = React.createRef();
    }

    componentDidMount() {
        // update editor with new props if any
        if (this.props.init_body) {
            const updated_editor = this.updateEditorState(this.props);
            this.setState({
                editorState: updated_editor.editorState
            });
        }

        this.setState({
            editor: true // init editor
        });
    }

    updateEditorState = (props) => {
        let contentState;
        let editorState;

        if (validate_html(props.init_body)) {
            // it has html
            const blockFromHtml = convertFromHTML(props.init_body);

            if (blockFromHtml !== null) {
                contentState = ContentState.createFromBlockArray(
                    blockFromHtml.contentBlocks,
                    blockFromHtml.entityMap
                );
            }
        } else {
            // it doesn't have html so create from text
            contentState = ContentState.createFromText(props.init_body);
        }

        editorState = EditorState.push(this.state.editorState, contentState);
        editorState = EditorState.moveFocusToEnd(editorState);

        return {
            editorState
        };
    };

    componentDidUpdate(old_props) {
        if (old_props.init_body !== this.props.init_body && this.props.init_body !== null) {
            this.setState({
                editorState: this.updateEditorState(this.props).editorState
            });
        }
    }

    onChange = (editorState) => {
        const html = stateToHTML(editorState.getCurrentContent());


        this.setState({
            editorState
        });

        this.props.onChange(html);
    };

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };

    toggleCommand = (command, type) => {
        if (type == 'block') {
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, command));
        } else if (type == 'inline') {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, command));
        }
    };

    render() {
        return (
            <div className="editor-input" onClick={this.editorFocus}>
                <Controls editorState={this.state.editorState} onToggle={this.toggleCommand} />
                {this.state.editor && (
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        ref={this.editor}
                        plugins={this.state.plugins}
                        placeholder="Tell your amazing story..."
                        spellCheck
                    />
                )}
            </div>
        );
    }
}

ContentEditor.propTypes = {
    onChange: types.func.isRequired,
    init_body: types.string
};
