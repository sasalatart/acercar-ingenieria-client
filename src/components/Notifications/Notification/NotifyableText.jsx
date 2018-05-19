import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
  intlShape,
} from 'react-intl';
import { Tooltip } from 'antd';
import truncate from 'lodash/truncate';
import DiscussionLink from '../../Discussions/Discussion/Link';
import ArticleLink from '../../Articles/Article/Link';
import CommentLink from '../../Comments/Comment/Link';
import { NOTIFYABLE_TYPES } from '../../../lib/notifications';

const LINK_TAGS = {
  [NOTIFYABLE_TYPES.discussion]: DiscussionLink,
  [NOTIFYABLE_TYPES.article]: ArticleLink,
  [NOTIFYABLE_TYPES.comment]: CommentLink,
};

const styles = {
  comment: {
    fontStyle: 'italic',
  },
};

function renderNotCommentNotification(
  notifyableType,
  notifyableId,
  notifyableMeta,
  seeDisabled,
  t,
) {
  const content = truncate(notifyableMeta.title);

  const hasApprovedProperty = Object.prototype.hasOwnProperty.call(notifyableMeta, 'approved');
  if (!seeDisabled && hasApprovedProperty && !notifyableMeta.approved) {
    return <Tooltip title={t({ id: 'notifications.resourceNotApproved' })}>{content}</Tooltip>;
  }

  const LinkTag = LINK_TAGS[notifyableType];
  return <LinkTag id={notifyableId} {...notifyableMeta}>{content}</LinkTag>;
}

function renderCommentNotification(notifyableMeta, seeDisabled, t) {
  const {
    commentableType, commentableId, approvedCommentable, content,
  } = notifyableMeta;

  const CommentableLink = LINK_TAGS[commentableType];
  const commentable = t({ id: commentableType.toLowerCase() });
  const enrollable = approvedCommentable || seeDisabled
    ? <CommentableLink id={commentableId}>{commentable}</CommentableLink>
    : <Tooltip title={t({ id: 'notifications.resourceNotApproved' })}>{commentable}</Tooltip>;

  return (
    <Fragment>
      <span style={styles.comment}>{truncate(content)}</span>{' '}
      <FormattedMessage
        id="notifications.resource.toTheEnrolled"
        values={{ enrollable }}
      />
    </Fragment>
  );
}

function NotifyableText({
  notifyableType,
  notifyableId,
  notifyableMeta,
  seeDisabled,
  intl: { formatMessage: t },
}) {
  const resourceText = t({ id: `notifications.resource.${notifyableType.toLowerCase()}` });
  return (
    <Fragment>
      {resourceText}{' '}
      {notifyableType !== NOTIFYABLE_TYPES.comment
        ? renderNotCommentNotification(notifyableType, notifyableId, notifyableMeta, seeDisabled, t)
        : renderCommentNotification(notifyableMeta, seeDisabled, t)
      }
    </Fragment>
  );
}

NotifyableText.propTypes = {
  notifyableType: PropTypes.string.isRequired,
  notifyableId: PropTypes.number.isRequired,
  notifyableMeta: PropTypes.shape({}).isRequired,
  seeDisabled: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(NotifyableText);
