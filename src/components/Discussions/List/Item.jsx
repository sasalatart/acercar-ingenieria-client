import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
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

function renderActions(admin, discussion) {
  const {
    id,
    impressionsCount,
    commentsCount,
    likesCount,
    likedByCurrentUser,
  } = discussion;

  const actions = [
    <IconText type="eye" text={impressionsCount} />,
    <LikeButton
      collection="discussions"
      id={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
      iconOnly
    />,
    <IconText type="message" text={commentsCount} />,
  ];

  if (admin) {
    actions.push(<DestroyButton collection="discussions" id={id} iconOnly />);
  }

  return actions;
}

function renderMeta(discussion, t) {
  const {
    id,
    title,
    pinned,
    author,
    createdAt,
  } = discussion;

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
      <span>{t({ id: 'submittedBy' })}</span>
      <Link to={authorHref} href={authorHref}>
        {`${author.firstName} ${author.lastName}`}
      </Link>,
      <DateWithFormat dateString={createdAt} withTime style={styles.date} />
    </span>
  );

  return <Meta title={titleTag} description={description} />;
}

function DiscussionListItem({
  admin,
  discussion,
  onTagClick,
  intl: { formatMessage: t },
}) {
  const { tagList } = discussion;

  return (
    <Item actions={renderActions(admin, discussion)}>
      {renderMeta(discussion, t)}
      {tagList.length > 0 && <TagList tags={tagList} onTagClick={onTagClick} withIcon />}
    </Item>
  );
}

DiscussionListItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  discussion: discussionShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(DiscussionListItem));
