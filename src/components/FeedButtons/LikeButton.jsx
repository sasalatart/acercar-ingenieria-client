import React from 'react';
import PropTypes from 'prop-types';
import ToggleLoadingButton from '../ToggleLoadingButton';

function LikeButton({
  likedByCurrentUser,
  likesCount,
  ...rest
}) {
  return (
    <ToggleLoadingButton
      active={likedByCurrentUser}
      content={likesCount}
      activeIcon="like"
      inactiveIcon="like-o"
      {...rest}
    />
  );
}

LikeButton.propTypes = {
  likedByCurrentUser: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
};

LikeButton.defaultProps = {
  likedByCurrentUser: false,
};

export default LikeButton;
