import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import WithAuthorization from '../../hoc/WithAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import ButtonLink from '../../containers/ButtonLink';
import ROUTES from '../../routes';

function QuestionsActionBar({
  loggedIn,
  adminOrMajorAdmin,
  majorId,
  pending,
  onProposeClicked,
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

  if (adminOrMajorAdmin) {
    actions.push(pending
      ? (
        <ButtonLink
          key="goToAnswered"
          to={ROUTES.QUESTIONS(majorId)}
          content={t({ id: 'routing.questions' })}
          icon="question-circle"
        />
      )
      : (
        <ButtonLink
          key="goToPending"
          to={ROUTES.PENDING_QUESTIONS(majorId)}
          content={t({ id: 'routing.pendingQuestions' })}
          icon="question-circle-o"
        />
      ));
  }

  return <ActionBar actions={actions} />;
}

QuestionsActionBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  majorId: PropTypes.number,
  pending: PropTypes.bool.isRequired,
  onProposeClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

QuestionsActionBar.defaultProps = {
  majorId: undefined,
};

export default injectIntl(WithAuthorization(QuestionsActionBar));
