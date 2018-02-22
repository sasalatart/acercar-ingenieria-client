import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Alert } from 'antd';
import { TextArea, CheckboxField, SubmitButton } from '../Forms';
import { userShape } from '../../shapes';
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
    currentUser: userShape.isRequired,
    majorId: PropTypes.number,
    id: PropTypes.number,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
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
      currentUser, majorId, id, valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

    const hasAdminPrivileges = currentUser.admin
      || (majorId && currentUser.adminOfMajors.includes(majorId));

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
          {hasAdminPrivileges &&
            <Field
              name="answer"
              component={TextArea}
              placeholder={t({ id: 'forms.answer' })}
              validate={[validators.required, validators.minLength, validators.maxAnswerLength]}
            />
          }
          {hasAdminPrivileges &&
            <div style={styles.pinnedWrapper}>
              <span>{t({ id: 'forms.pinned' })}</span>
              <Field name="pinned" component={CheckboxField} hasFeedback={false} />
            </div>
          }
          <SubmitButton disabled={!valid} loading={submitting} />
        </form>
      </div>
    );
  }
}

export default QuestionForm;
