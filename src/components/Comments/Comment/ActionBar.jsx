import React from 'react';
import PropTypes from 'prop-types';
import lowerFirst from 'lodash/lowerFirst';
import withAuthorization from '../../../hoc/withAuthorization';
import LikeButton from '../../../containers/FeedButtons/LikeButton';
import EnrollButton from '../../../containers/FeedButtons/EnrollButton';
import DestroyButton from '../../../containers/DestroyButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import { commentShape } from '../../../shapes';
import collections from '../../../lib/collections';

function CommentActionBar({
  admin,
  isAuthor,
  comment: {
    id,
    likedByCurrentUser,
    likesCount,
    enrolledByCurrentUser,
    commentableType,
    commentableId,
  },
  onDestroy,
}) {
  const actions = [
    <LikeButton
      key="like"
      baseCollection={collections.comments}
      baseId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
    <EnrollButton
      key="enroll"
      baseCollection={collections.comments}
      baseId={id}
      enrolledByCurrentUser={enrolledByCurrentUser}
    />,
  ];

  if (isAuthor || admin) {
    const destroyButton = (
      <DestroyButton
        key="destroy"
        collection={collections.comments}
        id={id}
        baseCollection={`${lowerFirst(commentableType)}s`}
        baseId={commentableId}
        callback={onDestroy}
      />
    );

    actions.push(destroyButton);
  }

  return <ActionBar actions={actions} />;
}

CommentActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  comment: commentShape.isRequired,
  onDestroy: PropTypes.func.isRequired,
};

export default withAuthorization(CommentActionBar);
