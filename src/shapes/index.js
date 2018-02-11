import PropTypes from 'prop-types';

export const avatarShape = PropTypes.shape({
  thumb: PropTypes.string,
  medium: PropTypes.string,
  large: PropTypes.string,
});

export const userShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  generation: PropTypes.number.isRequired,
  bio: PropTypes.string,
  active: PropTypes.bool.isRequired,
  avatar: avatarShape,
  createdAt: PropTypes.string.isRequired,
});
