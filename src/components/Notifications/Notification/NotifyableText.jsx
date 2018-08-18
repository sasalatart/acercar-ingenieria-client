import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
) {
  const content = truncate(notifyableMeta.title);

  const hasApprovedProperty = Object.prototype.hasOwnProperty.call(notifyableMeta, 'approved');
  if (!seeDisabled && hasApprovedProperty && !notifyableMeta.approved) {
    return (
      <Tooltip title={<FormattedMessage id="notifications.resourceNotApproved" />}>
        {content}
      </Tooltip>
    );
  }

  const LinkTag = LINK_TAGS[notifyableType];
  return <LinkTag id={notifyableId} {...notifyableMeta}>{content}</LinkTag>;
}

function renderCommentNotification(notifyableMeta, seeDisabled) {
  const {
    commentableType, commentableId, approvedCommentable, content,
  } = notifyableMeta;

  const CommentableLink = LINK_TAGS[commentableType];
  const commentable = <FormattedMessage id={commentableType.toLowerCase()} />;
  const enrollable = approvedCommentable || seeDisabled
    ? <CommentableLink id={commentableId}>{commentable}</CommentableLink>
    : <Tooltip title={<FormattedMessage id="notifications.resourceNotApproved" />}>{commentable}</Tooltip>;

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
}) {
  return (
    <Fragment>
      <FormattedMessage id={`notifications.resource.${notifyableType.toLowerCase()}`} />{' '}
      {notifyableType !== NOTIFYABLE_TYPES.comment
        ? renderNotCommentNotification(notifyableType, notifyableId, notifyableMeta, seeDisabled)
        : renderCommentNotification(notifyableMeta, seeDisabled)
      }
    </Fragment>
  );
}

NotifyableText.propTypes = {
  notifyableType: PropTypes.string.isRequired,
  notifyableId: PropTypes.number.isRequired,
  notifyableMeta: PropTypes.shape({}).isRequired,
  seeDisabled: PropTypes.bool.isRequired,
};

export default NotifyableText;
