import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Icon } from 'antd';
import { TextField, SubmitButton } from '../Forms';
import { colors } from '../../theme';

const styles = {
  fieldPrefix: {
    color: colors.fieldPrefix,
  },
};

const fieldIcons = {
  email: <Icon type="user" style={styles.fieldPrefix} />,
  password: <Icon type="lock" style={styles.fieldPrefix} />,
};

function SignInForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        component={TextField}
        placeholder="e-mail"
        prefix={fieldIcons.email}
        validate={[validators.required, validators.pucEmail]}
      />
      <Field
        name="password"
        component={TextField}
        placeholder={t({ id: 'forms.password' })}
        prefix={fieldIcons.password}
        type="password"
        validate={[validators.required, validators.minPasswordLength]}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

SignInForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default SignInForm;
