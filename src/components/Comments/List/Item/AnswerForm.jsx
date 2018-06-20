import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../containers/Comments/Form';
import { CancelButton } from '../../../Forms';
import collections from '../../../../lib/collections';

const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
  },
  mainContent: {
    flex: 1,
  },
  cancelButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0 24px 5px',
  },
};

function AnswerForm({ parentCommentId, onStopAnswering }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.mainContent}>
        <Form
          baseResourceName={collections.comments}
          baseResourceId={parentCommentId}
          onSubmitSuccess={onStopAnswering}
          autoFocus
        />
      </div>
      <CancelButton onClick={onStopAnswering} style={styles.cancelButtonWrapper} />
    </div>
  );
}

AnswerForm.propTypes = {
  parentCommentId: PropTypes.number.isRequired,
  onStopAnswering: PropTypes.func.isRequired,
};

export default AnswerForm;
