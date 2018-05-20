import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { RichTextField, SubmitButton } from '../Forms';

function ReportForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="body"
        component={RichTextField}
        disabled={submitting}
        label={t({ id: 'forms.reason' })}
        validate={validators.requiredRichText}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

ReportForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default ReportForm;
