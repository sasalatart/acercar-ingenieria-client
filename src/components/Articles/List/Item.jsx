import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import IconText from '../../IconText';
import LikeButton from '../../../containers/LikeButton';
import DestroyButton from '../../../containers/Articles/DestroyButton';
import ROUTES from '../../../routes';
import { articleShape } from '../../../shapes';
import articlePlaceholder from '../../../images/article.png';

const { Item } = List;
const { Meta } = Item;

function ArticleListItem({
  hasAdminPrivileges,
  article: {
    id,
    majorId,
    title,
    author,
    shortDescription,
    picture,
    commentsCount,
    likedByCurrentUser,
    likesCount,
  },
}) {
  const actions = [
    <IconText type="message" text={commentsCount} />,
    <LikeButton
      collectionName="articles"
      resourceId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
      iconOnly
    />,
  ];

  if (hasAdminPrivileges) {
    actions.push(<DestroyButton id={id} majorId={majorId} iconOnly />);
  }

  const titleHref = ROUTES.ARTICLE(id, majorId);
  const titleText = <Link to={titleHref} href={titleHref}>{title}</Link>;

  const imageSrc = picture ? picture.medium : articlePlaceholder;
  const imageTag = <img alt="summary-logo" src={imageSrc} />;

  const authorHref = ROUTES.USER(author.id);
  const authorName = (
    <Link to={authorHref} href={authorHref}>
      {`${author.firstName} ${author.lastName}`}
    </Link>
  );

  return (
    <Item actions={actions} extra={imageTag}>
      <Meta title={titleText} description={authorName} />
      {shortDescription}
    </Item>
  );
}

ArticleListItem.propTypes = {
  hasAdminPrivileges: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
};

export default ArticleListItem;
