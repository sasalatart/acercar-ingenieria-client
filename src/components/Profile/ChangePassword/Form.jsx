import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Icon } from 'antd';
import { TextField, SubmitButton } from '../../Forms';
import { colors } from '../../../theme';

const styles = {
  fieldPrefix: {
    color: colors.fieldPrefix,
  },
};

const fieldIcons = {
  password: <Icon type="lock" style={styles.fieldPrefix} />,
};

function ChangePasswordForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="password"
        component={TextField}
        placeholder={t({ id: 'forms.password' })}
        prefix={fieldIcons.password}
        type="password"
        validate={[validators.required, validators.minPasswordLength]}
      />
      <Field
        name="passwordConfirmation"
        component={TextField}
        placeholder={t({ id: 'forms.passwordConfirmation' })}
        prefix={fieldIcons.password}
        type="password"
        validate={[
          validators.required, validators.minPasswordLength, validators.confirmsPassword,
        ]}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

ChangePasswordForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default ChangePasswordForm;
