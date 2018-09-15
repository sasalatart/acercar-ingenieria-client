import React from 'react';
import PropTypes from 'prop-types';
import lowerFirst from 'lodash/lowerFirst';
import Form from '../../../containers/Comments/Form';
import { CancelButton } from '../../Forms';
import { commentShape } from '../../../shapes';

const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
  },
  form: {
    flex: 1,
  },
  cancelButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0 24px 5px',
  },
};

function EditForm({ comment, onStopEditing }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.form}>
        <Form
          baseCollection={`${lowerFirst(comment.commentableType)}s`}
          baseId={comment.commentableId}
          comment={comment}
          onSubmitSuccess={onStopEditing}
          autoFocus
        />
      </div>
      <CancelButton onClick={onStopEditing} style={styles.cancelButtonWrapper} />
    </div>
  );
}


EditForm.propTypes = {
  comment: commentShape.isRequired,
  onStopEditing: PropTypes.func.isRequired,
};

export default EditForm;
