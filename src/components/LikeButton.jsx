import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from '../shapes';
import IconText from './IconText';

function LikeButton({
  currentUser, likedByCurrentUser, likesCount, likingOrUnliking, onLike, onUnlike,
}) {
  if (likingOrUnliking) {
    return <IconText type="loading" text={likesCount} />;
  }

  return likedByCurrentUser
    ? <IconText type="like" text={likesCount} onClick={() => currentUser && onUnlike()} />
    : <IconText type="like-o" text={likesCount} onClick={() => currentUser && onLike()} />;
}

LikeButton.propTypes = {
  currentUser: userShape,
  likedByCurrentUser: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
  likingOrUnliking: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

LikeButton.defaultProps = {
  currentUser: undefined,
  likedByCurrentUser: false,
};

export default LikeButton;
