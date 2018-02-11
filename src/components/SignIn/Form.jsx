import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { Button, Icon } from 'antd';
import { TextField } from '../Forms';
import { required, pucEmail, minLength } from '../Forms/validators';
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

const MIN_LENGTH = 8;

class SignInForm extends Component {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  constructor(props) {
    super(props);
    this.setValidators();
  }

  setValidators() {
    const t = this.props.intl.formatMessage;
    this.validators = {
      required: required(t({ id: 'forms.required' })),
      pucEmail: pucEmail(t({ id: 'forms.pucEmail' })),
      minLength: minLength(t({ id: 'forms.minLength' }, { length: MIN_LENGTH }), MIN_LENGTH),
    };
  }

  render() {
    const {
      valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          component={TextField}
          placeholder="e-mail"
          prefix={fieldIcons.email}
          validate={[this.validators.required, this.validators.pucEmail]}
        />
        <Field
          name="password"
          component={TextField}
          placeholder={t({ id: 'forms.password' })}
          prefix={fieldIcons.password}
          type="password"
          validate={[this.validators.required, this.validators.minLength]}
        />
        <Button
          type="primary"
          htmlType="submit"
          disabled={!valid}
          loading={submitting}
          style={styles.submitButton}
        >
          {t({ id: 'routing.signIn' })}
        </Button>
      </form>
    );
  }
}

export default SignInForm;
