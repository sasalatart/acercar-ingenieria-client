import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Button, Icon } from 'antd';
import { TextField } from '../Forms';
import usersValidations from '../../validations/users';
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

class SignInForm extends Component {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  componentWillMount() {
    this.setValidators(this.props.intl.formatMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intl.locale !== this.props.intl.locale) {
      this.setValidators(nextProps.intl.formatMessage);
    }
  }

  setValidators(t) {
    this.setState({ validators: usersValidations(t) });
  }

  render() {
    const {
      valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

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
