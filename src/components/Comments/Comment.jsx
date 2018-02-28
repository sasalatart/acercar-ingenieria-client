import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { commentShape } from '../../shapes';
import LikeButton from '../../containers/LikeButton';
import DestroyButton from '../../containers/Comments/DestroyButton';
import ProfileAvatar from '../Profile/Avatar';
import DateWithFormat from '../DateWithFormat';
import ChildComments from './ChildComments';

const styles = {
  parentWrapper: {
    display: 'flex',
    marginTop: '33px',
  },
  childWrapper: {
    display: 'flex',
    marginTop: '20px',
    marginLeft: '66px',
  },
  avatar: {
    marginRight: '10px',
  },
  mainContent: {
    flex: 1,
  },
  metaData: {
    margin: 0,
    fontWeight: 'bold',
  },
  content: {
    margin: 0,
  },
};

function renderDestroyButton(id, commentableType, commentableId) {
  const props = { id, [`${commentableType.toLowerCase()}Id`]: commentableId };
  return <DestroyButton {...props} iconOnly />;
}

function Comment({
  isAuthor,
  hasAdminPrivileges,
  comment: {
    id,
    commentableType,
    commentableId,
    author,
    content,
    parentCommentId,
    childComments,
    likesCount,
    likedByCurrentUser,
    createdAt,
  },
}) {
  const canDestroy = hasAdminPrivileges || isAuthor;

  return (
    <div>
      <div style={parentCommentId ? styles.childWrapper : styles.parentWrapper}>
        <ProfileAvatar user={author} style={styles.avatar} />
        <div style={styles.mainContent}>
          <p style={styles.metaData}>
            {author.firstName} {author.lastName}, <DateWithFormat dateString={createdAt} withTime />
          </p>
          <p style={styles.content}>{content}</p>
        </div>
        <div>
          <LikeButton
            collectionName="comments"
            resourceId={id}
            likedByCurrentUser={likedByCurrentUser}
            likesCount={likesCount}
            iconOnly
          />
          <Divider type="vertical" />
          <a href="/edit" >edit</a>
          {canDestroy && <Divider type="vertical" />}
          {canDestroy && renderDestroyButton(id, commentableType, commentableId)}
        </div>
      </div>

      {childComments && childComments.length && <ChildComments comments={childComments} />}

      {!parentCommentId && <Divider />}
    </div>
  );
}

Comment.propTypes = {
  isAuthor: PropTypes.bool.isRequired,
  hasAdminPrivileges: PropTypes.bool.isRequired,
  comment: commentShape.isRequired,
};

export default Comment;
