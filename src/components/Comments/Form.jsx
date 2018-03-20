import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { TextArea, SubmitButton } from '../Forms';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  content: {
    flex: 1,
    margin: 0,
  },
  submitButton: {
    minWidth: '150px',
    margin: '0 0 24px 5px',
  },
};

function CommentForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  style,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit} style={{ ...styles.wrapper, ...style }}>
      <div style={styles.content}>
        <Field
          name="content"
          component={TextArea}
          placeholder={t({ id: 'forms.content' })}
          validate={[validators.required, validators.maxLength]}
          disabled={submitting}
        />
      </div>
      <SubmitButton
        disabled={!valid || submitting}
        loading={submitting}
        style={styles.submitButton}
      />
    </form>
  );
}

CommentForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  intl: intlShape.isRequired,
};

CommentForm.defaultProps = {
  style: {},
};

export default CommentForm;
