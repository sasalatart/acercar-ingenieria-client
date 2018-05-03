import React from 'react';
import { Divider } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ActionBar from '../../../containers/Discussions/Discussion/ActionBar';
import Title from '../../Layout/Title';
import Author from '../../Author';
import TagList from '../../TagList';
import DateWithFormat from '../../DateWithFormat';
import RichText from '../../RichText';
import Attachments from '../../Attachments';
import CommentsSection from '../../Comments/Section';
import { discussionShape } from '../../../shapes';

const styles = {
  date: {
    fontWeight: 'bold',
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function Discussion({ discussion }) {
  return (
    <div>
      <ActionBar discussion={discussion} />
      <Title text={discussion.title} />

      {discussion.tagList.length > 0 &&
        <div style={styles.tagsContainer}>
          <TagList tags={discussion.tagList} />
        </div>
      }

      <Divider />

      <Author author={discussion.author} />
      <DateWithFormat dateString={discussion.createdAt} style={styles.date} />

      <Divider />
      <RichText content={discussion.description} />

      {!isEmpty(discussion.attachments) &&
        <div>
          <Divider />
          <Attachments attachments={discussion.attachments} />
        </div>
      }

      <Divider />
      <CommentsSection baseResourceName="discussions" baseResourceId={discussion.id} />
    </div>
  );
}

Discussion.propTypes = {
  discussion: discussionShape.isRequired,
};

export default Discussion;
