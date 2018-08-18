import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import { fieldMetaShape } from '../../shapes';
import { themeStyles } from '../../theme';

const styles = {
  editorWrapper: {
    backgroundColor: '#FDFDFD',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '5px',
  },
  error: themeStyles.error,
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
    meta: fieldMetaShape.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    editorProps: PropTypes.shape({}),
  };

  static defaultProps = {
    label: undefined,
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
    const { label, editorProps, meta: { error } } = this.props;

    return (
      <Fragment>
        {label && <p style={themeStyles.label}>{label}:</p>}
        <div style={styles.editorWrapper}>
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.handleEditorStateChange}
            style={styles.editor}
            {...editorProps}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </Fragment>
    );
  }
}

export default RichTextInput;
