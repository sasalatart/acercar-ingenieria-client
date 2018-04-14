import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Divider } from 'antd';
import lowerFirst from 'lodash/lowerFirst';
import LikeButton from '../../../../containers/LikeButton';
import EnrollButton from '../../../../containers/EnrollButton';
import DestroyButton from '../../../../containers/DestroyButton';
import { commentShape } from '../../../../shapes';

const styles = {
  editButton: {
    cursor: 'pointer',
  },
};

function withDivider(tag) {
  return (
    <span>
      <Divider type="vertical" />
      {tag}
    </span>
  );
}

function renderLikeButton(comment) {
  const { id, likedByCurrentUser, likesCount } = comment;

  return (
    <LikeButton
      baseResourceName="comments"
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
      baseResourceName="comments"
      baseResourceId={id}
      enrolledByCurrentUser={enrolledByCurrentUser}
      iconOnly
    />
  );
  return withDivider(enrollButton);
}

function renderEditButton(onStartEditing) {
  return withDivider(<Icon type="edit" onClick={onStartEditing} style={styles.editButton} />);
}

function renderDestroyButton(comment) {
  const { id, commentableType, commentableId } = comment;
  const destroyButton = (
    <DestroyButton
      collection="comments"
      id={id}
      baseResourceName={`${lowerFirst(commentableType)}s`}
      baseResourceId={commentableId}
      iconOnly
    />
  );
  return withDivider(destroyButton);
}

function CommentActions({
  adminOrMajorAdmin,
  isAuthor,
  comment,
  onStartEditing,
}) {
  return (
    <div>
      {renderLikeButton(comment)}
      {comment.commentableType !== 'Comment' && renderEnrollButton(comment)}
      {isAuthor && renderEditButton(onStartEditing)}
      {(adminOrMajorAdmin || isAuthor) && renderDestroyButton(comment)}
    </div>
  );
}

CommentActions.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  comment: commentShape.isRequired,
  onStartEditing: PropTypes.func.isRequired,
};

export default CommentActions;
