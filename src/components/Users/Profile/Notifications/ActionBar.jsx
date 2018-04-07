import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../../containers/Layout/ActionBar';
import HideableButton from '../../../HideableButton';
import ROUTES from '../../../../routes';

function QuestionsActionBar({ seen, intl: { formatMessage: t } }) {
  const toggleRoute = ROUTES.NOTIFICATIONS(!seen);
  const toggleIcon = seen ? 'eye' : 'eye-o';
  const toggleI18n = seen ? 'notifications.pending' : 'notifications.seen';

  const actions = [
    <HideableButton key="goToPending" to={toggleRoute} icon={toggleIcon}>
      {t({ id: toggleI18n })}
    </HideableButton>,
  ];

  return <ActionBar actions={actions} />;
}

QuestionsActionBar.propTypes = {
  seen: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuestionsActionBar);
