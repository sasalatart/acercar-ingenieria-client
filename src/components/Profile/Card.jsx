import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import noop from 'lodash/noop';
import { userShape } from '../../shapes';
import userImage from '../../images/user.png';

const { Meta } = Card;

const styles = {
  card: {
    maxWidth: '200px',
  },
};

function ProfileCard({ user, hoverable, onClick }) {
  const cover = <img alt="profilePicture" src={user.avatar ? user.avatar.medium : userImage} />;

  return (
    <Card cover={cover} onClick={onClick} style={styles.card} hoverable={hoverable}>
      <Meta title={`${user.firstName} ${user.lastName}`} description={user.bio} />
    </Card>
  );
}

ProfileCard.propTypes = {
  user: userShape.isRequired,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
};

ProfileCard.defaultProps = {
  hoverable: false,
  onClick: noop,
};

export default ProfileCard;
