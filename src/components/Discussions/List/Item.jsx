import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LikeButton from '../../../containers/FeedButtons/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import DateWithFormat from '../../Layout/DateWithFormat';
import TagList from '../../Layout/TagList';
import IconText from '../../Icons/IconText';
import Author from '../../Author';
import DiscussionLink from '../../Discussions/Discussion/Link';
import { colors } from '../../../theme';
import { discussionSummaryShape } from '../../../shapes';
import collections from '../../../lib/collections';

const { Item } = List;
const { Meta } = Item;

const styles = {
  star: {
    color: colors.starred,
  },
  date: {
    marginLeft: '5px',
  },
};

function renderActions(currentUserId, admin, discussion) {
  const {
    id,
    author,
    impressionsCount,
    commentsCount,
    likesCount,
  } = discussion;
  const isAuthor = currentUserId === author.id;

  const actions = [
    <IconText icon={['far', 'eye']} text={impressionsCount} />,
    <LikeButton likesCount={likesCount} iconOnly disabled />,
    <IconText icon="comment" text={commentsCount} />,
  ];

  if (isAuthor || admin) {
    const destroyButton = <DestroyButton collection={collections.discussions} id={id} iconOnly />;
    actions.push(destroyButton);
  }

  return actions;
}

function renderMeta(discussion) {
  const {
    id,
    title,
    pinned,
    author,
    createdAt,
  } = discussion;

  const titleTag = (
    <span>
      {pinned && <FontAwesomeIcon icon="star" style={styles.star} />}
      <DiscussionLink id={id}>{title}</DiscussionLink>
    </span>
  );

  const description = (
    <span>
      <Author author={author} spanned />
      <DateWithFormat dateString={createdAt} withTime style={styles.date} />
    </span>
  );

  return <Meta title={titleTag} description={description} />;
}

function DiscussionListItem({
  currentUserId,
  admin,
  discussion,
  discussion: {
    tagList,
  },
  onTagClick,
}) {
  return (
    <Item actions={renderActions(currentUserId, admin, discussion)}>
      {renderMeta(discussion)}
      {tagList.length > 0 && <TagList tags={tagList} onTagClick={onTagClick} withIcon />}
    </Item>
  );
}

DiscussionListItem.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  admin: PropTypes.bool.isRequired,
  discussion: discussionSummaryShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default DiscussionListItem;
