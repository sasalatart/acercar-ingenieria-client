import React from 'react';
import PropTypes from 'prop-types';
import ToggleLoadingButton from './ToggleLoadingButton';

function LikeButton({
  loggedIn,
  likedByCurrentUser,
  likesCount,
  ...rest
}) {
  return (
    <ToggleLoadingButton
      enabled={loggedIn}
      active={likedByCurrentUser}
      content={likesCount}
      activeIcon="like"
      inactiveIcon="like-o"
      {...rest}
    />
  );
}

LikeButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  likedByCurrentUser: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
};

LikeButton.defaultProps = {
  likedByCurrentUser: false,
};

export default LikeButton;
