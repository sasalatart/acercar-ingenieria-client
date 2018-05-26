import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import EditForm from './EditForm';
import DateWithFormat from '../../DateWithFormat';
import ProfileLink from '../../Users/Profile/Link';
import { commentShape, childCommentShape } from '../../../shapes';
import { themeStyles } from '../../../theme';

const styles = {
  wrapper: {
    flex: 1,
  },
  metaData: {
    margin: 0,
    fontWeight: 'bold',
  },
  content: {
    margin: '0 20px 0 0',
    ...themeStyles.justifiedTextContainer,
  },
};

function MainContent({
  comment,
  editing,
  onStopEditing,
}) {
  const { author, content, createdAt } = comment;
  return (
    <div style={styles.wrapper}>
      <p style={styles.metaData}>
        <ProfileLink id={author.id}>{author.firstName} {author.lastName}</ProfileLink>{', '}
        <DateWithFormat dateString={createdAt} withTime />
      </p>
      {editing
        ? <EditForm comment={comment} onStopEditing={onStopEditing} />
        : (
          <Linkify>
            <p style={styles.content}>{content}</p>
          </Linkify>
        )}
    </div>
  );
}

MainContent.propTypes = {
  comment: PropTypes.oneOfType([
    commentShape,
    childCommentShape,
  ]).isRequired,
  editing: PropTypes.bool,
  onStopEditing: PropTypes.func.isRequired,
};

MainContent.defaultProps = {
  editing: false,
};

export default MainContent;
