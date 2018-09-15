import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';
import routes from '../../lib/routes';

function NotificationsActionBar({
  seen,
  noUnseenNotifications,
  settingAllAsSeen,
  setAllAsSeen,
}) {
  const actions = [
    <HideableButton
      key="toggleList"
      to={routes.profileNotifications(!seen)}
      icon={seen ? 'eye' : 'eye-slash'}
    >
      <FormattedMessage id={seen ? 'notifications.unseen' : 'notifications.seen'} />
    </HideableButton>,
  ];

  if (!seen) {
    const setAllAsSeenButton = (
      <HideableButton
        key="setAllAsSeen"
        icon="dot-circle"
        loading={settingAllAsSeen}
        disabled={settingAllAsSeen || noUnseenNotifications}
        onClick={setAllAsSeen}
      >
        <FormattedMessage id="notifications.setAllAsSeen" />
      </HideableButton>
    );
    actions.unshift(setAllAsSeenButton);
  }

  return <ActionBar actions={actions} />;
}

NotificationsActionBar.propTypes = {
  seen: PropTypes.bool.isRequired,
  noUnseenNotifications: PropTypes.bool.isRequired,
  settingAllAsSeen: PropTypes.bool.isRequired,
  setAllAsSeen: PropTypes.func.isRequired,
};

export default NotificationsActionBar;
