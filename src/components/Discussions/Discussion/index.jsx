import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ActionBar from '../../../containers/Discussions/Discussion/ActionBar';
import Title from '../../Layout/Title';
import Author from '../../Author';
import TagList from '../../TagList';
import FeedButtons from '../../FeedButtons';
import DateWithFormat from '../../DateWithFormat';
import RichText from '../../RichText';
import Attachments from '../../Attachments';
import CommentsSection from '../../Comments/Section';
import { discussionShape, discussionSummaryShape } from '../../../shapes';
import collections from '../../../lib/collections';

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
  const {
    id,
    title,
    tagList,
    author,
    description,
    attachments,
    createdAt,
  } = discussion;

  return (
    <Fragment>
      <ActionBar id={id} />
      <Title>{title}</Title>

      {tagList.length > 0 &&
        <div style={styles.tagsContainer}>
          <TagList tags={tagList} />
        </div>
      }

      <FeedButtons resource={discussion} baseResourceName={collections.discussions} />

      <Divider />
      <Author author={author} />
      <DateWithFormat dateString={createdAt} style={styles.date} />

      <Divider />
      <RichText content={description} />

      {!isEmpty(attachments) &&
        <Fragment>
          <Divider />
          <Attachments attachments={attachments} />
        </Fragment>
      }

      <Divider />
      <CommentsSection baseResourceName={collections.discussions} baseResourceId={id} />
    </Fragment>
  );
}

Discussion.propTypes = {
  discussion: PropTypes.oneOfType([
    discussionSummaryShape,
    discussionShape,
  ]).isRequired,
};

export default Discussion;
