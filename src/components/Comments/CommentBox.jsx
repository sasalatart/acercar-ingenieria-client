import React from 'react';
import { Divider } from 'antd';
import { commentShape } from '../../shapes';
import ProfileAvatar from '../Profile/Avatar';
import DateWithFormat from '../DateWithFormat';

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

function CommentBox({
  comment: {
    author,
    content,
    parentCommentId,
    childComments,
    createdAt,
  },
}) {
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
          <a href="/edit" >edit</a>
          <Divider type="vertical" />
          <a href="/delete">delete</a>
        </div>
      </div>

      {childComments && childComments.length &&
        childComments.map(child => <CommentBox key={child.id} comment={child} />)}

      {!parentCommentId && <Divider />}
    </div>
  );
}

CommentBox.propTypes = {
  comment: commentShape.isRequired,
};

export default CommentBox;
