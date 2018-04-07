import React from 'react';
import {
  injectIntl,
  FormattedMessage,
  intlShape,
} from 'react-intl';
import { Icon } from 'antd';
import humps from 'humps';
import truncate from 'lodash/truncate';
import ProfileLink from '../Link';
import DiscussionLink from '../../../Discussions/Discussion/Link';
import ArticleLink from '../../../Articles/Article/Link';
import DateWithFormat from '../../../DateWithFormat';
import { notificationShape } from '../../../../shapes';

const NOTIFYABLE_TYPES = {
  discussion: 'Discussion',
  article: 'Article',
  comment: 'Comment',
};

const styles = {
  icon: {
    marginRight: '5px',
  },
  comment: {
    fontStyle: 'italic',
  },
};

const ICON_TYPES = {
  [NOTIFYABLE_TYPES.discussion]: 'star',
  [NOTIFYABLE_TYPES.article]: 'file-text',
  [NOTIFYABLE_TYPES.comment]: 'message',
};

function renderActionText(user, actionType) {
  const { id, firstName, lastName } = user;

  return (
    <FormattedMessage
      id={`notifications.actions.has${humps.pascalize(actionType)}`}
      values={{
        userName: <ProfileLink id={id} firstName={firstName} lastName={lastName} />,
      }}
    />
  );
}

function renderResourceSuffix(notifyableType, notifyableId, notifyableMeta) {
  switch (notifyableType) {
    case NOTIFYABLE_TYPES.discussion:
      return <DiscussionLink id={notifyableId} title={notifyableMeta.title} />;
    case NOTIFYABLE_TYPES.article: {
      const { majorId, title } = notifyableMeta;
      return <ArticleLink id={notifyableId} majorId={majorId} title={title} />;
    }
    case NOTIFYABLE_TYPES.comment:
      return <span style={styles.comment}>{truncate(notifyableMeta.content)}</span>;
    default:
      return undefined;
  }
}

function renderNotifyableText(notifyableType, notifyableId, notifyableMeta, t) {
  const resourceText = t({ id: `notifications.resource.${notifyableType.toLowerCase()}` });
  return (
    <span>
      {resourceText}{' '}{renderResourceSuffix(notifyableType, notifyableId, notifyableMeta)}
    </span>
  );
}

function Notification({
  notification: {
    notificator,
    actionType,
    notifyableId,
    notifyableType,
    notifyableMeta,
    createdAt,
  },
  intl: { formatMessage: t },
}) {
  return (
    <div>
      <Icon type={ICON_TYPES[notifyableType]} style={styles.icon} />
      <DateWithFormat dateString={createdAt} withTime />
      <p>
        {renderActionText(notificator, actionType)}{' '}
        {renderNotifyableText(notifyableType, notifyableId, notifyableMeta, t)}
      </p>
    </div>
  );
}

Notification.propTypes = {
  notification: notificationShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Notification);
