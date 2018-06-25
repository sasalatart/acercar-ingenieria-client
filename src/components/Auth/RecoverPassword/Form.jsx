import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TextField,
  SubmitButton,
} from '../../Forms';
import { colors } from '../../../theme';

const styles = {
  fieldPrefix: {
    color: colors.fieldPrefix,
  },
};

const fieldIcons = {
  email: <FontAwesomeIcon icon="user" style={styles.fieldPrefix} />,
};

function RecoverPasswordForm({
  validators,
  valid,
  submitting,
  handleSubmit,
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
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

RecoverPasswordForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default RecoverPasswordForm;
