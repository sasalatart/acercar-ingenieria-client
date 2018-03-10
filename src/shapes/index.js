import PropTypes from 'prop-types';

export const imageShape = PropTypes.shape({
  thumb: PropTypes.string,
  medium: PropTypes.string,
  large: PropTypes.string,
});

export const attachmentShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  attachableType: PropTypes.string.isRequired,
  attachableId: PropTypes.number.isRequired,
  documentFileName: PropTypes.string.isRequired,
  documentContentType: PropTypes.string.isRequired,
  documentFileSize: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const announcementShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
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

export const paginationShape = PropTypes.shape({
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
});

export const questionShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,
  author: userShape.isRequired,
  major: majorSummaryShape,
  pinned: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const articleShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  picture: imageShape,
  shortDescription: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: userShape.isRequired,
  majorSummary: majorSummaryShape,
  categoryList: PropTypes.arrayOf(PropTypes.string),
  likesCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const categoryShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const optionShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
});

const sharedCommentShape = {
  id: PropTypes.number.isRequired,
  author: userShape.isRequired,
  commentableType: PropTypes.string.isRequired,
  commentableId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  likedByCurrentUser: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export const childCommentShape = PropTypes.shape({
  ...sharedCommentShape,
  parentCommentId: PropTypes.number.isRequired,
});

export const commentShape = PropTypes.shape({
  ...sharedCommentShape,
  childComments: PropTypes.arrayOf(childCommentShape),
});

export const lightboxImageShape = PropTypes.shape({
  src: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
});
