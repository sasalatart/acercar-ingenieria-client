import React from 'react';
import PropTypes from 'prop-types';
import LikeButton from '../../containers/FeedButtons/LikeButton';
import EnrollButton from '../../containers/FeedButtons/EnrollButton';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
  },
  button: {
    margin: '5px',
  },
};

function FeedButtons({
  resource: {
    id,
    likedByCurrentUser,
    likesCount,
    enrolledByCurrentUser,
  },
  baseResourceName,
}) {
  const common = {
    baseResourceName, baseResourceId: id, size: 'small', style: styles.button,
  };

  return (
    <div style={styles.container}>
      <LikeButton likedByCurrentUser={likedByCurrentUser} likesCount={likesCount} {...common} />
      <EnrollButton enrolledByCurrentUser={enrolledByCurrentUser} {...common} />
    </div>
  );
}

FeedButtons.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likedByCurrentUser: PropTypes.bool.isRequired,
    likesCount: PropTypes.number.isRequired,
    enrolledByCurrentUser: PropTypes.bool.isRequired,
  }).isRequired,
  baseResourceName: PropTypes.string.isRequired,
};

export default FeedButtons;
