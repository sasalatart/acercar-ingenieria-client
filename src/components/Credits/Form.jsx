import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import {
  TextField,
  ImageField,
  SubmitButton,
} from '../Forms';

function CreditsForm({
  validators,
  valid,
  submitting,
  currentResourceURL,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  const resourceValidators = [validators.image, validators.maxResourceSize];
  if (!currentResourceURL) resourceValidators.push(validators.required);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="resourceName"
          component={TextField}
          placeholder={t({ id: 'forms.resourceName' })}
          validate={validators.required}
        />
        <Field
          name="resourceUrl"
          component={TextField}
          placeholder={t({ id: 'forms.resourceUrl' })}
          validate={[validators.required, validators.resourceUrl]}
        />
        <Field
          name="authorName"
          component={TextField}
          placeholder={t({ id: 'forms.authorName' })}
          validate={validators.required}
        />
        <Field
          name="resource"
          component={ImageField}
          imagePlaceholder={currentResourceURL}
          validate={resourceValidators}
        />
        <SubmitButton disabled={!valid || submitting} loading={submitting} />
      </form>
    </div>
  );
}

CreditsForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  currentResourceURL: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

CreditsForm.defaultProps = {
  currentResourceURL: undefined,
};

export default CreditsForm;
