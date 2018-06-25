import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import Radium from 'radium';
import lowerFirst from 'lodash/lowerFirst';
import LikeButton from '../../../../containers/FeedButtons/LikeButton';
import EnrollButton from '../../../../containers/FeedButtons/EnrollButton';
import DestroyButton from '../../../../containers/DestroyButton';
import Hideable from '../../../../components/Layout/Hideable';
import EditIcon from '../../../../components/Icons/Edit';
import { breakpoints } from '../../../../theme';
import { commentShape } from '../../../../shapes';
import collections from '../../../../lib/collections';

const styles = {
  wrapper: {
    [breakpoints.sm]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
};

function withDivider(tag) {
  return (
    <span>
      <Hideable>
        <Divider type="vertical" />
      </Hideable>
      {tag}
    </span>
  );
}

function renderLikeButton(comment) {
  const { id, likedByCurrentUser, likesCount } = comment;

  return (
    <LikeButton
      baseResourceName={collections.comments}
      baseResourceId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
      iconOnly
    />
  );
}

function renderEnrollButton(comment) {
  const { id, enrolledByCurrentUser } = comment;
  const enrollButton = (
    <EnrollButton
      baseResourceName={collections.comments}
      baseResourceId={id}
      enrolledByCurrentUser={enrolledByCurrentUser}
      iconOnly
    />
  );
  return withDivider(enrollButton);
}

function renderEditButton(onStartEditing) {
  const editButton = <EditIcon onClick={onStartEditing} />;
  return withDivider(editButton);
}

function renderDestroyButton(comment, approved) {
  const { id, commentableType, commentableId } = comment;
  const destroyButton = (
    <DestroyButton
      collection={collections.comments}
      id={id}
      baseResourceName={`${lowerFirst(commentableType)}s`}
      baseResourceId={commentableId}
      iconOnly
    />
  );
  return approved ? withDivider(destroyButton) : destroyButton;
}

function CommentActions({
  currentUserId,
  adminOrMajorAdmin,
  comment,
  comment: {
    author,
    approvedCommentable,
    commentableType,
  },
  onStartEditing,
}) {
  const isAuthor = currentUserId === author.id;

  return (
    <div style={styles.wrapper}>
      {approvedCommentable && renderLikeButton(comment)}
      {approvedCommentable && commentableType !== 'Comment' && renderEnrollButton(comment)}
      {approvedCommentable && isAuthor && renderEditButton(onStartEditing)}
      {(adminOrMajorAdmin || isAuthor) && renderDestroyButton(comment, approvedCommentable)}
    </div>
  );
}

CommentActions.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  comment: commentShape.isRequired,
  onStartEditing: PropTypes.func.isRequired,
};

export default Radium(CommentActions);
