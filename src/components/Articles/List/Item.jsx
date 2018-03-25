import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Icon } from 'antd';
import Linkify from 'react-linkify';
import WithAuthorization from '../../../hoc/WithAuthorization';
import LikeButton from '../../../containers/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import TagList from '../..//TagList';
import IconText from '../../IconText';
import ROUTES from '../../../routes';
import { articleShape } from '../../../shapes';
import { themeStyles } from '../../../theme';
import articlePlaceholder from '../../../images/article.png';

const { Item } = List;
const { Meta } = Item;

const styles = {
  shortDescription: themeStyles.justifiedTextContainer,
  image: {
    height: '150px',
  },
};

function ArticleListItem({
  adminOrMajorAdmin,
  article: {
    id,
    majorId,
    title,
    categoryList,
    author,
    shortDescription,
    picture,
    commentsCount,
    likedByCurrentUser,
    likesCount,
  },
  onTagClick,
}) {
  const actions = [
    <IconText type="message" text={commentsCount} />,
    <LikeButton
      collection="articles"
      id={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
      iconOnly
    />,
  ];

  if (adminOrMajorAdmin) {
    actions.push(<DestroyButton collection="articles" id={id} baseResourceId={majorId} iconOnly />);
  }

  const titleHref = ROUTES.ARTICLE(id, majorId);
  const titleTag = (
    <span>
      <Link to={titleHref} href={titleHref}>{title}</Link>
    </span>
  );

  const imageSrc = picture ? picture.medium : articlePlaceholder;
  const imageTag = <img alt="summary-logo" src={imageSrc} style={styles.image} />;

  const authorHref = ROUTES.USER(author.id);
  const authorName = (
    <Link to={authorHref} href={authorHref}>
      {`${author.firstName} ${author.lastName}`}
    </Link>
  );

  const shortDescriptionTag = (
    <Linkify>
      <p style={styles.shortDescription}>{shortDescription}</p>
    </Linkify>
  );

  return (
    <Item actions={actions} extra={imageTag}>
      <Meta title={titleTag} description={authorName} />
      {categoryList.length > 0 &&
        <div>
          <Icon type="tags" />
          <TagList tags={categoryList} onTagClick={onTagClick} />
        </div>
      }
      {shortDescriptionTag}
    </Item>
  );
}

ArticleListItem.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default WithAuthorization(ArticleListItem);
