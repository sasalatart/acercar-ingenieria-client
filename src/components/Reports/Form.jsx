import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { RichTextField, SubmitButton } from '../Forms';

function ReportForm({
  validators,
  valid,
  submitting,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="body"
        component={RichTextField}
        disabled={submitting}
        label={<FormattedMessage id="forms.reason" />}
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
};

export default ReportForm;
