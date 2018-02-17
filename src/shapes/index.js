import PropTypes from 'prop-types';

export const imageShape = PropTypes.shape({
  thumb: PropTypes.string,
  medium: PropTypes.string,
  large: PropTypes.string,
});

export const announcementShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  pinned: PropTypes.bool.isRequired,
  picture: imageShape.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const majorShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  logo: imageShape,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const majorSummaryShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  logo: imageShape,
});

export const majorOfInterestShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  majorId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  logo: imageShape,
});

export const userShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  generation: PropTypes.number.isRequired,
  bio: PropTypes.string,
  active: PropTypes.bool.isRequired,
  avatar: imageShape,
  admin: PropTypes.bool,
  majorsOfInterest: PropTypes.arrayOf(majorSummaryShape),
  adminOfMajors: PropTypes.arrayOf(majorSummaryShape),
  createdAt: PropTypes.string.isRequired,
});

export const locationShape = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string,
});
