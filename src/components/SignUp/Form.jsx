import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { Button, Icon, Row, Col } from 'antd';
import { TextField } from '../Forms';
import {
  required,
  pucEmail,
  minLength,
  maxLength,
  isBetween,
  isEqualTo,
} from '../Forms/validators';
import { colors } from '../../theme';

const styles = {
  fieldPrefix: {
    color: colors.fieldPrefix,
  },
  submitButton: {
    width: '100%',
  },
};

const fieldIcons = {
  email: <Icon type="user" style={styles.fieldPrefix} />,
  password: <Icon type="lock" style={styles.fieldPrefix} />,
};

const MIN_PASSWORD_LENGTH = 8;
const MAX_NAME_LENGTH = 25;
const MIN_GENERATION = 1904;
const MAX_GENERATION = (new Date()).getFullYear();
const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };

class SignUpForm extends Component {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  componentWillMount() {
    this.setValidators();
  }

  setValidators() {
    const t = this.props.intl.formatMessage;
    this.setState({
      validators: {
        required: required(t({ id: 'forms.required' })),
        pucEmail: pucEmail(t({ id: 'forms.pucEmail' })),

        minLength: minLength(
          t({ id: 'forms.minLength' }, { length: MIN_PASSWORD_LENGTH }),
          MIN_PASSWORD_LENGTH,
        ),

        maxLength: maxLength(
          t({ id: 'forms.maxLength' }, { length: MAX_NAME_LENGTH }),
          MAX_NAME_LENGTH,
        ),

        isBetween: isBetween(
          t({ id: 'forms.isBetween' }, { min: MIN_GENERATION, max: MAX_GENERATION }),
          MIN_GENERATION,
          MAX_GENERATION,
        ),

        confirmsPassword: isEqualTo(
          t({ id: 'forms.isEqualTo' }, { target: t({ id: 'forms.password' }) }),
          'password',
        ),
      },
    });
  }

  render() {
    const {
      valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <Row gutter={GUTTER}>
          <Col {...COLUMN_LAYOUT}>
            <Field
              name="email"
              component={TextField}
              placeholder="e-mail"
              prefix={fieldIcons.email}
              validate={[validators.required, validators.pucEmail]}
            />
          </Col>
          <Col {...COLUMN_LAYOUT}>
            <Field
              name="generation"
              component={TextField}
              placeholder={t({ id: 'forms.generation' })}
              type="number"
              validate={[validators.required, validators.isBetween]}
            />
          </Col>
        </Row>
        <Row gutter={GUTTER}>
          <Col {...COLUMN_LAYOUT}>
            <Field
              name="firstName"
              component={TextField}
              placeholder={t({ id: 'forms.firstName' })}
              validate={[validators.required, validators.maxLength]}
            />
          </Col>
          <Col {...COLUMN_LAYOUT}>
            <Field
              name="lastName"
              component={TextField}
              placeholder={t({ id: 'forms.lastName' })}
              validate={[validators.required, validators.maxLength]}
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
              validate={[validators.required, validators.minLength]}
            />
          </Col>
          <Col {...COLUMN_LAYOUT}>
            <Field
              name="passwordConfirmation"
              component={TextField}
              placeholder={t({ id: 'forms.passwordConfirmation' })}
              prefix={fieldIcons.password}
              type="password"
              validate={[validators.required, validators.minLength, validators.confirmsPassword]}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!valid}
          loading={submitting}
          style={styles.submitButton}
        >
          {t({ id: 'routing.signUp' })}
        </Button>
      </form>
    );
  }
}

export default SignUpForm;
