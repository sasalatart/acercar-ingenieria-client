import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import {
  TextField,
  RichTextField,
  SubmitButton,
} from '../../Forms';
import emailValidations from '../../../validations/email';

class EmailForm extends Component {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  componentWillMount() {
    this.setValidators(this.props.intl.formatMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intl.locale !== this.props.intl.locale) {
      this.setValidators(nextProps.intl.formatMessage);
    }
  }

  setValidators(t) {
    this.setState({ validators: emailValidations(t) });
  }

  render() {
    const {
      valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;
    const { validators } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="subject"
          component={TextField}
          disabled={submitting}
          placeholder={t({ id: 'forms.subject' })}
          validate={[validators.required, validators.maxLength]}
        />
        <Field
          name="content"
          component={RichTextField}
          disabled={submitting}
          placeholder={t({ id: 'forms.content' })}
          validate={validators.required}
        />
        <SubmitButton disabled={!valid || submitting} loading={submitting} />
      </form>
    );
  }
}

export default EmailForm;
