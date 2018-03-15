import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Alert } from 'antd';
import {
  TextArea,
  SwitchField,
  SubmitButton,
} from '../Forms';
import questionsValidations from '../../validations/questions';

const styles = {
  pinnedWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  alert: {
    marginBottom: '24px',
  },
};

class QuestionForm extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    id: PropTypes.number,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    id: undefined,
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
    this.setState({ validators: questionsValidations(t) });
  }

  render() {
    const {
      adminOrMajorAdmin, id, valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

    return (
      <div>
        {!id &&
          <Alert
            type="warning"
            message={t({ id: 'forms.beforeCreatingQuestionAlert.message' })}
            description={t({ id: 'forms.beforeCreatingQuestionAlert.description' })}
            style={styles.alert}
            showIcon
          />
        }
        <form onSubmit={handleSubmit}>
          <Field
            name="question"
            component={TextArea}
            placeholder={t({ id: 'forms.question' })}
            validate={[validators.required, validators.minLength, validators.maxQuestionLength]}
          />
          {adminOrMajorAdmin &&
            <Field
              name="answer"
              component={TextArea}
              placeholder={t({ id: 'forms.answer' })}
              validate={[validators.minLength, validators.maxAnswerLength]}
            />
          }
          {adminOrMajorAdmin &&
            <div style={styles.pinnedWrapper}>
              <Field name="pinned" component={SwitchField} label={t({ id: 'forms.pinned' })} />
            </div>
          }
          <SubmitButton disabled={!valid} loading={submitting} />
        </form>
      </div>
    );
  }
}

export default QuestionForm;
