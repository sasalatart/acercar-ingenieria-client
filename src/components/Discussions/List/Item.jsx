import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Icon } from 'antd';
import WithAuthorization from '../../../hoc/WithAuthorization';
import LikeButton from '../../../containers/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import IconText from '../../IconText';
import DateWithFormat from '../../DateWithFormat';
import TagList from '../../TagList';
import ROUTES from '../../../routes';
import { colors } from '../../../theme';
import { discussionShape } from '../../../shapes';

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

function DiscussionListItem({
  admin,
  discussion: {
    id,
    author,
    title,
    tagList,
    pinned,
    impressionsCount,
    commentsCount,
    likesCount,
    likedByCurrentUser,
    createdAt,
  },
  onTagClick,
}) {
  const actions = [
    <IconText type="eye" text={impressionsCount} />,
    <IconText type="message" text={commentsCount} />,
    <LikeButton
      collection="discussions"
      id={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
      iconOnly
    />,
  ];

  if (admin) {
    actions.push(<DestroyButton collection="discussions" id={id} iconOnly />);
  }

  const titleHref = ROUTES.DISCUSSION(id);
  const titleLink = <Link to={titleHref} href={titleHref}>{title}</Link>;
  const titleTag = (
    <span>
      {pinned && <Icon type="star" style={styles.star} />}
      {titleLink}
    </span>
  );

  const authorHref = ROUTES.USER(author.id);
  const description = (
    <span>
      <Link to={authorHref} href={authorHref}>
        {`${author.firstName} ${author.lastName}`}
      </Link>,
      <DateWithFormat dateString={createdAt} withTime style={styles.date} />
    </span>
  );

  return (
    <Item actions={actions}>
      <Meta title={titleTag} description={description} />
      {tagList.length > 0 &&
        <div>
          <Icon type="tags" />
          <TagList tags={tagList} onTagClick={onTagClick} />
        </div>
      }
    </Item>
  );
}

DiscussionListItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  discussion: discussionShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default WithAuthorization(DiscussionListItem);
