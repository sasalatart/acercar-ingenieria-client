import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TextField,
  NumberField,
  SubmitButton,
} from '../../Forms';
import { colors } from '../../../theme';

const styles = {
  fieldPrefix: {
    color: colors.fieldPrefix,
  },
  generationInput: {
    width: '100%',
  },
};

const fieldIcons = {
  password: <FontAwesomeIcon icon="lock" style={styles.fieldPrefix} />,
};

const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };

function SignUpForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Row gutter={GUTTER}>
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="email"
            component={TextField}
            placeholder="e-mail"
            validate={[validators.required, validators.pucEmail]}
          />
        </Col>
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="generation"
            component={NumberField}
            placeholder={t({ id: 'forms.generation' })}
            validate={[validators.required, validators.numeric, validators.isBetweenYears]}
            style={styles.generationInput}
          />
        </Col>
      </Row>
      <Row gutter={GUTTER}>
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="firstName"
            component={TextField}
            placeholder={t({ id: 'forms.firstName' })}
            validate={[validators.required, validators.maxNameLength]}
          />
        </Col>
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="lastName"
            component={TextField}
            placeholder={t({ id: 'forms.lastName' })}
            validate={[validators.required, validators.maxNameLength]}
          />
        </Col>
      </Row>
      <Row gutter={GUTTER}>
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="password"
            component={TextField}
            placeholder={t({ id: 'forms.password' })}
            prefix={fieldIcons.password}
            type="password"
            validate={[validators.required, validators.minPasswordLength]}
          />
        </Col>
        <Col {...COLUMN_LAYOUT}>
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
        </Col>
      </Row>
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

SignUpForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default SignUpForm;
