import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';
import MediaContent from '../../Layout/MediaContent';
import TagList from '../../Layout/TagList';
import DateWithFormat from '../../Layout/DateWithFormat';
import Author from '../../Author';
import FeedButtons from '../../FeedButtons';
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

function Discussion({
  discussion,
  discussion: {
    id,
    title,
    tagList,
    author,
    description,
    attachments,
    createdAt,
  },
  ...restProps
}) {
  return (
    <Fragment>
      <ActionBar id={id} {...restProps} />
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
      <MediaContent richText={description} attachments={attachments} />

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
