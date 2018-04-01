import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
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
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    height: '150px',
  },
};

function renderActions(loggedIn, adminOrMajorAdmin, article) {
  if (!loggedIn) return [];

  const {
    id,
    majorId,
    commentsCount,
    likesCount,
    likedByCurrentUser,
  } = article;

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

  return actions;
}

function renderExtra(picture) {
  const imageSrc = picture ? picture.medium : articlePlaceholder;
  return (
    <div style={styles.imageWrapper}>
      <img alt="summary-logo" src={imageSrc} style={styles.image} />
    </div>
  );
}

function renderMeta(article, articleHref, t) {
  const { title, author } = article;

  const titleTag = (
    <span>
      <Link to={articleHref} href={articleHref}>{title}</Link>
    </span>
  );

  const authorHref = ROUTES.USER(author.id);
  const authorName = (
    <span>
      <span>{t({ id: 'author' })}: </span>
      <Link to={authorHref} href={authorHref}>
        {`${author.firstName} ${author.lastName}`}
      </Link>
    </span>
  );

  return <Meta title={titleTag} description={authorName} />;
}

function renderShortDescription(shortDescription, articleHref, t) {
  return (
    <Linkify>
      <p style={styles.shortDescription}>{shortDescription}</p>
      <Link to={articleHref} href={articleHref}>{t({ id: 'articles.readMore' })}</Link>
    </Linkify>
  );
}

function ArticleListItem({
  loggedIn,
  adminOrMajorAdmin,
  article,
  onTagClick,
  intl: { formatMessage: t },
}) {
  const articleHref = ROUTES.ARTICLE(article.id, article.majorId);
  const actions = renderActions(loggedIn, adminOrMajorAdmin, article);
  const extra = renderExtra(article.picture);

  return (
    <Item actions={actions} extra={extra}>
      {renderMeta(article, articleHref, t)}
      {article.categoryList.length > 0 &&
        <TagList tags={article.categoryList} onTagClick={onTagClick} withIcon />
      }
      {renderShortDescription(article.shortDescription, articleHref, t)}
    </Item>
  );
}

ArticleListItem.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(ArticleListItem));
