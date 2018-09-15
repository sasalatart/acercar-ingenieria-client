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
  baseCollection,
  disabled,
}) {
  const common = {
    baseCollection,
    baseId: id,
    size: 'small',
    disabled: disabled || likedByCurrentUser === undefined || enrolledByCurrentUser === undefined,
    style: styles.button,
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
    likesCount: PropTypes.number.isRequired,
    likedByCurrentUser: PropTypes.bool,
    enrolledByCurrentUser: PropTypes.bool,
    approved: PropTypes.bool,
  }).isRequired,
  baseCollection: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

FeedButtons.defaultProps = {
  disabled: false,
};

export default FeedButtons;
