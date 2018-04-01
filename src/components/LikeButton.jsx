import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import IconText from './IconText';

function LikeButton({
  loggedIn, likedByCurrentUser, likesCount, likingOrUnliking, onClick, iconOnly,
}) {
  if (likingOrUnliking) {
    return iconOnly
      ? <IconText type="loading" text={likesCount} />
      : <Button type="primary" loading>{likesCount}</Button>;
  }

  const icon = likedByCurrentUser ? 'like' : 'like-o';

  if (iconOnly) {
    return <IconText type={icon} text={likesCount} onClick={onClick} withPointer={loggedIn} />;
  }

  const type = likedByCurrentUser ? 'primary' : 'secondary';

  return (
    <Button type={type} icon={icon} disabled={!loggedIn} onClick={onClick}>
      {likesCount}
    </Button>
  );
}

LikeButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  likedByCurrentUser: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
  likingOrUnliking: PropTypes.bool.isRequired,
  iconOnly: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

LikeButton.defaultProps = {
  likedByCurrentUser: false,
  iconOnly: false,
};

export default LikeButton;
