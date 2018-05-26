import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';
import WithAuthorization from '../../../hoc/WithAuthorization';
import LikeButton from '../../../containers/FeedButtons/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import IconText from '../../IconText';
import DateWithFormat from '../../DateWithFormat';
import TagList from '../../TagList';
import Author from '../../Author';
import DiscussionLink from '../../Discussions/Discussion/Link';
import { colors } from '../../../theme';
import { discussionSummaryShape } from '../../../shapes';

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

function renderActions(admin, discussion) {
  const {
    id,
    impressionsCount,
    commentsCount,
    likesCount,
  } = discussion;

  const actions = [
    <IconText type="eye" text={impressionsCount} />,
    <LikeButton likesCount={likesCount} iconOnly disabled />,
    <IconText type="message" text={commentsCount} />,
  ];

  if (admin) {
    actions.push(<DestroyButton collection="discussions" id={id} iconOnly />);
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
      {pinned && <Icon type="star" style={styles.star} />}
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

function DiscussionListItem({ admin, discussion, onTagClick }) {
  const { tagList } = discussion;

  return (
    <Item actions={renderActions(admin, discussion)}>
      {renderMeta(discussion)}
      {tagList.length > 0 && <TagList tags={tagList} onTagClick={onTagClick} withIcon />}
    </Item>
  );
}

DiscussionListItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  discussion: discussionSummaryShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default WithAuthorization(DiscussionListItem);
