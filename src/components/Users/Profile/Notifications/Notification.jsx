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
import CommentsLink from '../../../Comments/Link';
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

const LINK_TAGS = {
  [NOTIFYABLE_TYPES.discussion]: DiscussionLink,
  [NOTIFYABLE_TYPES.article]: ArticleLink,
  [NOTIFYABLE_TYPES.comment]: CommentsLink,
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
        userName: <ProfileLink id={id}>{firstName} {lastName}</ProfileLink>,
      }}
    />
  );
}

function renderResourceSuffix(notifyableType, notifyableId, notifyableMeta, t) {
  if (notifyableType !== NOTIFYABLE_TYPES.comment) {
    const LinkTag = LINK_TAGS[notifyableType];
    return (
      <LinkTag id={notifyableId} {...notifyableMeta}>
        {truncate(notifyableMeta.title)}
      </LinkTag>
    );
  }

  const { commentableType, commentableId, content } = notifyableMeta;
  const CommentableLink = LINK_TAGS[commentableType];
  return (
    <span>
      <span style={styles.comment}>{truncate(content)}</span>{' '}
      <FormattedMessage
        id="notifications.resource.toTheEnrolled"
        values={{
          enrollable: (
            <CommentableLink id={commentableId} {...notifyableMeta}>
              {t({ id: commentableType.toLowerCase() })}
            </CommentableLink>
          ),
        }}
      />
    </span>
  );
}

function renderNotifyableText(notifyableType, notifyableId, notifyableMeta, t) {
  const resourceText = t({ id: `notifications.resource.${notifyableType.toLowerCase()}` });
  return (
    <span>
      {resourceText}{' '}
      {renderResourceSuffix(notifyableType, notifyableId, notifyableMeta, t)}
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
