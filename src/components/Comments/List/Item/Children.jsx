import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Divider } from 'antd';
import lowerFirst from 'lodash/lowerFirst';
import Comment from './Comment';
import CommentLink from '../../Comment/Link';
import { childCommentShape } from '../../../../shapes';

const styles = {
  dividerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  divider: {
    width: '50%',
  },
};

function ChildComments({
  adminOrMajorAdmin,
  currentUserId,
  parentCommentId,
  parentCommentCommentableType,
  parentCommentCommentableId,
  comments,
  extraComments,
}) {
  return (
    <Fragment>
      {extraComments > 0 &&
        <div style={styles.dividerWrapper}>
          <Divider style={styles.divider} dashed>
            <CommentLink
              id={parentCommentId}
              baseCollection={`${lowerFirst(parentCommentCommentableType)}s`}
              baseId={parentCommentCommentableId}
            >
              <FormattedMessage id="comments.extras" values={{ extras: extraComments }} />
            </CommentLink>
          </Divider>
        </div>
      }
      {comments
        .sort((commentA, commentB) => new Date(commentA.createdAt) - new Date(commentB.createdAt))
        .map(comment => (
          <Comment
            key={comment.id}
            adminOrMajorAdmin={adminOrMajorAdmin}
            currentUserId={currentUserId}
            comment={comment}
          />
        ))}
    </Fragment>
  );
}

ChildComments.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  currentUserId: PropTypes.number.isRequired,
  parentCommentId: PropTypes.number.isRequired,
  parentCommentCommentableType: PropTypes.string.isRequired,
  parentCommentCommentableId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(childCommentShape).isRequired,
  extraComments: PropTypes.number.isRequired,
};

export default ChildComments;
