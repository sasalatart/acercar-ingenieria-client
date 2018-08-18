import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Alert } from 'antd';
import { TextArea, SwitchField, SubmitButton } from '../Forms';

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

function QuestionForm({
  validators,
  adminOrMajorAdmin,
  id,
  valid,
  submitting,
  handleSubmit,
}) {
  return (
    <Fragment>
      {!id &&
        <Alert
          type="info"
          message={<FormattedMessage id="forms.beforeCreatingQuestionAlert.message" />}
          description={<FormattedMessage id="forms.beforeCreatingQuestionAlert.description" />}
          style={styles.alert}
          showIcon
        />
      }
      <form onSubmit={handleSubmit}>
        <Field
          name="question"
          component={TextArea}
          label={<FormattedMessage id="forms.question" />}
          validate={[validators.required, validators.minLength, validators.maxQuestionLength]}
        />
        {adminOrMajorAdmin &&
          <Field
            name="answer"
            component={TextArea}
            label={<FormattedMessage id="forms.answer" />}
            validate={[validators.minLength, validators.maxAnswerLength]}
          />
        }
        {adminOrMajorAdmin &&
          <div style={styles.pinnedWrapper}>
            <Field
              name="pinned"
              component={SwitchField}
              label={<FormattedMessage id="forms.pinned" />}
            />
          </div>
        }
        <SubmitButton disabled={!valid || submitting} loading={submitting} />
      </form>
    </Fragment>
  );
}

QuestionForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  id: PropTypes.number,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

QuestionForm.defaultProps = {
  id: undefined,
};

export default QuestionForm;
