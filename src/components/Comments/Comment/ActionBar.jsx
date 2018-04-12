import React from 'react';
import PropTypes from 'prop-types';
import LikeButton from '../../../containers/LikeButton';
import EnrollButton from '../../../containers/EnrollButton';
import DestroyButton from '../../../containers/DestroyButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import { commentShape } from '../../../shapes';

function CommentActionBar({
  admin,
  comment: {
    id,
    likedByCurrentUser,
    likesCount,
    enrolledByCurrentUser,
  },
  onDestroy,
}) {
  const actions = [
    <LikeButton
      key="like"
      baseResourceName="comments"
      baseResourceId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
    <EnrollButton
      key="enroll"
      baseResourceName="comments"
      baseResourceId={id}
      enrolledByCurrentUser={enrolledByCurrentUser}
    />,
  ];

  if (admin) {
    const destroyButton = (
      <DestroyButton key="destroy" collection="comments" id={id} callback={onDestroy} />
    );

    actions.push(destroyButton);
  }

  return <ActionBar actions={actions} />;
}

CommentActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  comment: commentShape.isRequired,
  onDestroy: PropTypes.func.isRequired,
};

export default CommentActionBar;
