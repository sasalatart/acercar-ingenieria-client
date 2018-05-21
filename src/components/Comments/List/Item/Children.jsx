import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
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
  parentCommentId,
  parentCommentCommentableType,
  parentCommentCommentableId,
  comments,
  extraComments,
  intl: { formatMessage: t },
}) {
  return (
    <Fragment>
      {extraComments > 0 &&
        <div style={styles.dividerWrapper}>
          <Divider style={styles.divider} dashed>
            <CommentLink
              id={parentCommentId}
              baseResourceName={`${lowerFirst(parentCommentCommentableType)}s`}
              baseResourceId={parentCommentCommentableId}
            >
              {t({ id: 'comments.extras' }, { extras: extraComments })}
            </CommentLink>
          </Divider>
        </div>
      }
      {comments
        .sort((commentA, commentB) => new Date(commentA.createdAt) - new Date(commentB.createdAt))
        .map(comment => <Comment key={comment.id} comment={comment} />)}
    </Fragment>
  );
}

ChildComments.propTypes = {
  parentCommentId: PropTypes.number.isRequired,
  parentCommentCommentableType: PropTypes.string.isRequired,
  parentCommentCommentableId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(childCommentShape).isRequired,
  extraComments: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ChildComments);
