import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';
import routes from '../../lib/routes';

function NotificationsActionBar({
  seen,
  noPendingNotifications,
  settingAllAsSeen,
  setAllAsSeen,
  intl: { formatMessage: t },
}) {
  const actions = [
    <HideableButton
      key="goToPending"
      to={routes.profileNotifications(!seen)}
      icon={seen ? 'eye' : 'eye-slash'}
    >
      {t({ id: seen ? 'notifications.pending' : 'notifications.seen' })}
    </HideableButton>,
  ];

  if (!seen) {
    const setAllAsSeenButton = (
      <HideableButton
        key="setAllAsSeen"
        icon="dot-circle"
        loading={settingAllAsSeen}
        disabled={settingAllAsSeen || noPendingNotifications}
        onClick={setAllAsSeen}
      >
        {t({ id: 'notifications.setAllAsSeen' })}
      </HideableButton>
    );
    actions.unshift(setAllAsSeenButton);
  }

  return <ActionBar actions={actions} />;
}

NotificationsActionBar.propTypes = {
  seen: PropTypes.bool.isRequired,
  noPendingNotifications: PropTypes.bool.isRequired,
  settingAllAsSeen: PropTypes.bool.isRequired,
  setAllAsSeen: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(NotificationsActionBar);
