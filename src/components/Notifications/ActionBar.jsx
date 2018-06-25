import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';
import routes from '../../lib/routes';

function NotificationsActionBar({ seen, intl: { formatMessage: t } }) {
  const toggleRoute = routes.profileNotifications(!seen);
  const toggleIcon = seen ? 'eye' : 'eye-slash';
  const toggleI18n = seen ? 'notifications.pending' : 'notifications.seen';

  const actions = [
    <HideableButton key="goToPending" to={toggleRoute} icon={toggleIcon}>
      {t({ id: toggleI18n })}
    </HideableButton>,
  ];

  return <ActionBar actions={actions} />;
}

NotificationsActionBar.propTypes = {
  seen: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(NotificationsActionBar);
