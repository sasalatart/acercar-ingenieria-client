import PropTypes from 'prop-types';

export const imageShape = PropTypes.shape({
  thumb: PropTypes.string,
  medium: PropTypes.string,
  large: PropTypes.string,
});

export const attachmentShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  byteSize: PropTypes.number.isRequired,
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

const sharedUserShape = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  generation: PropTypes.number.isRequired,
  avatar: imageShape,
  createdAt: PropTypes.string.isRequired,
};

export const userShape = PropTypes.shape({
  ...sharedUserShape,
  bio: PropTypes.string,
  admin: PropTypes.bool,
  majorsOfInterest: PropTypes.arrayOf(majorSummaryShape),
  adminOfMajors: PropTypes.arrayOf(majorSummaryShape),
});

export const userSummaryShape = PropTypes.shape(sharedUserShape);

export const locationShape = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string,
});

export const matchShape = PropTypes.shape({
  params: PropTypes.shape({}),
});

export const paginationInfoShape = PropTypes.shape({
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
});

export const questionShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,
  author: userSummaryShape.isRequired,
  majorSummary: majorSummaryShape,
  pinned: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
});

const sharedArticleShape = {
  id: PropTypes.number.isRequired,
  author: userSummaryShape.isRequired,
  majorSummary: majorSummaryShape,
  categoryList: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  previewUrl: PropTypes.string,
  likesCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
  approved: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export const articleShape = PropTypes.shape({
  ...sharedArticleShape,
  content: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(attachmentShape),
  likedByCurrentUser: PropTypes.bool.isRequired,
  enrolledByCurrentUser: PropTypes.bool.isRequired,
});

export const articleSummaryShape = PropTypes.shape(sharedArticleShape);

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
  author: userSummaryShape.isRequired,
  commentableType: PropTypes.string.isRequired,
  commentableId: PropTypes.number.isRequired,
  approvedCommentable: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  likedByCurrentUser: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export const childCommentShape = PropTypes.shape(sharedCommentShape);

export const parentCommentShape = PropTypes.shape({
  ...sharedCommentShape,
  childComments: PropTypes.arrayOf(childCommentShape),
  extraComments: PropTypes.number,
  enrolledByCurrentUser: PropTypes.bool.isRequired,
});

export const commentShape = PropTypes.oneOfType([
  parentCommentShape,
  childCommentShape,
]);

export const videoLinkShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  pinned: PropTypes.bool.isRequired,
  videoLinkableType: PropTypes.string.isRequired,
  videoLinkableId: PropTypes.number.isRequired,
});

export const notificationShape = PropTypes.shape({
  notificator: userSummaryShape.isRequired,
  actionType: PropTypes.string.isRequired,
  notifyableId: PropTypes.number.isRequired,
  notifyableType: PropTypes.string.isRequired,
  notifyableMeta: PropTypes.shape({}).isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const lightboxImageShape = PropTypes.shape({
  src: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
});

const sharedDiscussionShape = {
  id: PropTypes.number.isRequired,
  author: userSummaryShape.isRequired,
  title: PropTypes.string.isRequired,
  pinned: PropTypes.bool.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  impressionsCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export const discussionShape = PropTypes.shape({
  ...sharedDiscussionShape,
  description: PropTypes.string.isRequired,
  likedByCurrentUser: PropTypes.bool.isRequired,
  enrolledByCurrentUser: PropTypes.bool.isRequired,
  attachments: PropTypes.arrayOf(attachmentShape),
});

export const discussionSummaryShape = PropTypes.shape(sharedDiscussionShape);

export const creditShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  resourceName: PropTypes.string.isRequired,
  resourceUrl: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  resource: imageShape.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const fieldMetaShape = PropTypes.shape({
  error: PropTypes.string,
});
