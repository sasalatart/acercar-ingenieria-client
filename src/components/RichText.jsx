import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { stateFromContent } from './Forms/RichTextInput';

function RichText({ content }) {
  return <Editor editorState={stateFromContent(content)} readOnly toolbarHidden />;
}

RichText.propTypes = {
  content: PropTypes.string.isRequired,
};

export default RichText;
