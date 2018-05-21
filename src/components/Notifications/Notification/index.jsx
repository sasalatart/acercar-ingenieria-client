import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import DateWithFormat from '../../DateWithFormat';
import ActionText from './ActionText';
import NotifyableText from './NotifyableText';
import { notificationShape } from '../../../shapes';
import { NOTIFYABLE_TYPES } from '../../../lib/notifications';

const ICON_TYPES = {
  [NOTIFYABLE_TYPES.discussion]: 'star',
  [NOTIFYABLE_TYPES.article]: 'file-text',
  [NOTIFYABLE_TYPES.comment]: 'message',
};

const styles = {
  icon: {
    marginRight: '5px',
  },
};

function Notification({
  notification: {
    notificator,
    actionType,
    notifyableId,
    notifyableType,
    notifyableMeta,
    createdAt,
  },
  seeDisabled,
}) {
  return (
    <Fragment>
      <Icon type={ICON_TYPES[notifyableType]} style={styles.icon} />
      <DateWithFormat dateString={createdAt} withTime />
      <p>
        <ActionText user={notificator} actionType={actionType} />{' '}
        <NotifyableText
          notifyableType={notifyableType}
          notifyableId={notifyableId}
          notifyableMeta={notifyableMeta}
          seeDisabled={seeDisabled}
        />
      </p>
    </Fragment>
  );
}

Notification.propTypes = {
  notification: notificationShape.isRequired,
  seeDisabled: PropTypes.bool.isRequired,
};

export default Notification;
