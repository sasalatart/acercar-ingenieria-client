import React from 'react';
import PropTypes from 'prop-types';
import ToggleLoadingButton from '../Layout/ToggleLoadingButton';

function LikeButton({
  likedByCurrentUser,
  likesCount,
  ...rest
}) {
  return (
    <ToggleLoadingButton
      active={likedByCurrentUser}
      content={likesCount}
      icon={likedByCurrentUser ? ['fas', 'heart'] : ['far', 'heart']}
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
