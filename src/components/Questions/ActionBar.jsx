import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../hoc/WithAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../HideableButton';
import routes from '../../lib/routes';
import { suffixes } from '../../lib/questions';

function QuestionsActionBar({
  loggedIn,
  adminOrMajorAdmin,
  majorId,
  pending,
  onProposeClicked,
  intl: { formatMessage: t },
}) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const route = routes.questions(majorId, pending ? undefined : suffixes.pending);

    const buttonLink = pending
      ? (
        <HideableButton key="goToAnswered" to={route} icon="question-circle">
          {t({ id: 'questions' })}
        </HideableButton>
      )
      : (
        <HideableButton key="goToPending" to={route} icon="question-circle-o">
          {t({ id: 'questions.pending' })}
        </HideableButton>
      );

    actions.push(buttonLink);
  }

  if (loggedIn) {
    const proposeOneButton = (
      <HideableButton type="primary" icon="plus" onClick={onProposeClicked}>
        {t({ id: 'forms.proposeOne' })}
      </HideableButton>
    );

    actions.push(proposeOneButton);
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
