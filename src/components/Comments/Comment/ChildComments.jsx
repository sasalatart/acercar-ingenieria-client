import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../../containers/Comments/Comment';
import { childCommentShape } from '../../../shapes';

function ChildComments({ comments }) {
  return (
    <div>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

ChildComments.propTypes = {
  comments: PropTypes.arrayOf(childCommentShape).isRequired,
};

export default ChildComments;
