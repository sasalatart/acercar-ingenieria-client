import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { TextField, ImageField, SubmitButton } from '../Forms';

function CreditsForm({
  validators,
  valid,
  submitting,
  currentResourceURL,
  handleSubmit,
}) {
  const resourceValidators = [validators.image, validators.maxResourceSize];
  if (!currentResourceURL) resourceValidators.push(validators.required);

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="resourceName"
        component={TextField}
        label={<FormattedMessage id="forms.resourceName" />}
        validate={validators.required}
      />
      <Field
        name="resourceUrl"
        component={TextField}
        label={<FormattedMessage id="forms.resourceUrl" />}
        validate={[validators.required, validators.resourceUrl]}
      />
      <Field
        name="authorName"
        component={TextField}
        label={<FormattedMessage id="forms.authorName" />}
        validate={validators.required}
      />
      <Field
        name="resource"
        component={ImageField}
        imagePlaceholder={currentResourceURL}
        label={<FormattedMessage id="forms.picture" />}
        validate={resourceValidators}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

CreditsForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  currentResourceURL: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

CreditsForm.defaultProps = {
  currentResourceURL: undefined,
};

export default CreditsForm;
