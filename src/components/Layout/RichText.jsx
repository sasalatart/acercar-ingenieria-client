import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import DataPlaceholder from './DataPlaceholder';
import { stateFromContent } from '../Forms/RichTextInput';

function RichText({ content }) {
  return content
    ? <Editor editorState={stateFromContent(content)} readOnly toolbarHidden />
    : <DataPlaceholder />;
}

RichText.propTypes = {
  content: PropTypes.string,
};

RichText.defaultProps = {
  content: undefined,
};

export default RichText;
