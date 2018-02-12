import React from 'react';
import { Card } from 'antd';
import { userShape } from '../../shapes';
import userImage from '../../images/user.png';

const styles = {
  card: {
    maxWidth: '200px',
  },
};

function ProfileCard({ user }) {
  const cover = <img alt="profilePicture" src={user.avatar ? user.avatar.medium : userImage} />;

  return (
    <Card cover={cover} style={styles.card}>
      <Card.Meta title={`${user.firstName} ${user.lastName}`} description={user.bio} />
    </Card>
  );
}

ProfileCard.propTypes = {
  user: userShape.isRequired,
};

export default ProfileCard;
