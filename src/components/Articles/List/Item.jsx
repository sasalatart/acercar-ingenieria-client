import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import Linkify from 'react-linkify';
import WithAuthorization from '../../../hoc/WithAuthorization';
import LikeButton from '../../../containers/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import TagList from '../..//TagList';
import IconText from '../../IconText';
import Hideable from '../../Layout/Hideable';
import ProfileLink from '../../Users/Profile/Link';
import ArticleLink from '../../Articles/Article/Link';
import { articleShape } from '../../../shapes';
import { themeStyles, breakpointsKeys } from '../../../theme';
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

function renderActions(adminOrMajorAdmin, article) {
  const {
    id,
    majorId,
    commentsCount,
    likesCount,
    likedByCurrentUser,
  } = article;

  const actions = [
    <LikeButton
      baseResourceName="articles"
      baseResourceId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
      iconOnly
    />,
    <IconText type="message" text={commentsCount} />,
  ];

  if (adminOrMajorAdmin) {
    actions.push(<DestroyButton collection="articles" id={id} baseResourceId={majorId} iconOnly />);
  }

  return actions;
}

function renderExtra(picture) {
  const imageSrc = picture ? picture.medium : articlePlaceholder;
  return (
    <Hideable breakpoint={breakpointsKeys.xs} style={styles.imageWrapper}>
      <img alt="summary-logo" src={imageSrc} style={styles.image} />
    </Hideable>
  );
}

function renderMeta(article, t) {
  const titleTag = (
    <span>
      <ArticleLink id={article.id} majorId={article.majorId}>{article.title}</ArticleLink>
    </span>
  );

  const { author } = article;
  const authorName = (
    <span>
      <span>{t({ id: 'submittedBy' })}</span>
      <ProfileLink id={author.id}>{author.firstName} {author.lastName}</ProfileLink>
    </span>
  );

  return <Meta title={titleTag} description={authorName} />;
}

function renderShortDescription(id, shortDescription, t) {
  return (
    <Linkify>
      <p style={styles.shortDescription}>{shortDescription}</p>
      <ArticleLink id={id}>{t({ id: 'articles.readMore' })}</ArticleLink>
    </Linkify>
  );
}

function ArticleListItem({
  adminOrMajorAdmin,
  article,
  onTagClick,
  intl: { formatMessage: t },
}) {
  const actions = renderActions(adminOrMajorAdmin, article);
  const extra = renderExtra(article.picture);

  return (
    <Item actions={actions} extra={extra}>
      {renderMeta(article, t)}
      {article.categoryList.length > 0 &&
        <TagList tags={article.categoryList} onTagClick={onTagClick} withIcon />
      }
      {renderShortDescription(article.id, article.shortDescription, t)}
    </Item>
  );
}

ArticleListItem.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  onTagClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(ArticleListItem));
