import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { TextField, SwitchField, SubmitButton } from '../Forms';

const styles = {
  switchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '15px 0',
  },
};

function VideosForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={TextField}
        label={t({ id: 'forms.title' })}
        validate={validators.required}
      />
      <Field
        name="url"
        component={TextField}
        label="URL"
        validate={[validators.required, validators.url]}
      />
      <div style={styles.switchContainer}>
        <Field
          name="pinned"
          component={SwitchField}
          label={t({ id: 'forms.pinned' })}
        />
      </div>
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

VideosForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default VideosForm;
