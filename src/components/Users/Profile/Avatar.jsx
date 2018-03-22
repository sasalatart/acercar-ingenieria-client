import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import randomColor from 'randomcolor';
import { userShape } from '../../../shapes';

function ProfileAvatar({
  user: { firstName, lastName, avatar }, size, shape, style,
}) {
  const commonProps = { size, shape };

  if (avatar) {
    return <Avatar src={avatar.thumb} {...commonProps} style={style} />;
  }

  const initials = firstName[0] + lastName[0];
  const color = randomColor({ seed: initials, luminosity: 'dark' });
  return (
    <Avatar {...commonProps} style={{ ...style, backgroundColor: color }}>
      {initials}
    </Avatar>
  );
}

ProfileAvatar.propTypes = {
  user: userShape.isRequired,
  size: PropTypes.string,
  shape: PropTypes.string,
  style: PropTypes.shape({}),
};

ProfileAvatar.defaultProps = {
  size: 'large',
  shape: 'square',
  style: {},
};

export default ProfileAvatar;
