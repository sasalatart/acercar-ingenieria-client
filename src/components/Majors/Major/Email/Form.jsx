import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import {
  TextField,
  RichTextField,
  SubmitButton,
} from '../../../Forms';

function EmailForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="subject"
        component={TextField}
        disabled={submitting}
        placeholder={t({ id: 'forms.subject' })}
        validate={[validators.required, validators.maxLength]}
      />
      <Field
        name="body"
        component={RichTextField}
        disabled={submitting}
        placeholder={t({ id: 'forms.content' })}
        validate={validators.requiredRichText}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

EmailForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default EmailForm;
