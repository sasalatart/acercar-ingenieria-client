import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';

const styles = {
  editorWrapper: {
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '5px',
  },
};

export function stateFromContent(content) {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
}

export function htmlFromContent(content) {
  return stateToHTML(stateFromContent(content).getCurrentContent());
}

class RichTextInput extends Component {
  static propTypes = {
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    editorProps: PropTypes.shape({}),
  };

  static defaultProps = {
    editorProps: {},
  }

  state = {
    editorState: this.props.input.value
      ? stateFromContent(this.props.input.value)
      : EditorState.createEmpty(),
  };

  handleEditorStateChange = (editorState) => {
    const { onChange } = this.props.input;
    const stringValue = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    this.setState({ editorState });
    onChange(stringValue);
  }

  render() {
    const { editorProps } = this.props;

    return (
      <div style={styles.editorWrapper}>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.handleEditorStateChange}
          style={styles.editor}
          {...editorProps}
        />
      </div>
    );
  }
}

export default RichTextInput;
