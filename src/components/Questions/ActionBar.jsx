import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import ActionBar from '../../containers/Layout/ActionBar';

function QuestionsActionBar({
  loggedIn,
  hasAdminPrivileges,
  pending,
  onProposeClicked,
  goToAnsweredQuestions,
  goToPendingQuestions,
  intl: { formatMessage: t },
}) {
  const actions = [];

  if (loggedIn) {
    const proposeOneButton = (
      <Button type="primary" icon="form" onClick={onProposeClicked}>
        {t({ id: 'forms.proposeOne' })}
      </Button>
    );

    actions.push(proposeOneButton);
  }

  if (hasAdminPrivileges) {
    actions.push(pending
      ? (
        <Button
          key="goToAnswered"
          type="primary"
          icon="question-circle"
          onClick={() => goToAnsweredQuestions()}
        >
          {t({ id: 'routing.questions' })}
        </Button>
      )
      : (
        <Button
          key="goToPending"
          type="primary"
          icon="question-circle-o"
          onClick={() => goToPendingQuestions()}
        >
          {t({ id: 'routing.pendingQuestions' })}
        </Button>
      ));
  }

  return <ActionBar actions={actions} />;
}

QuestionsActionBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  hasAdminPrivileges: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  onProposeClicked: PropTypes.func.isRequired,
  goToAnsweredQuestions: PropTypes.func.isRequired,
  goToPendingQuestions: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuestionsActionBar);
