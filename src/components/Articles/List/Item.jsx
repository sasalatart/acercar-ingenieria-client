import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import Linkify from 'react-linkify';
import WithAuthorization from '../../../hoc/WithAuthorization';
import LikeButton from '../../../containers/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import Author from '../../Author';
import TagList from '../../TagList';
import IconText from '../../IconText';
import Hideable from '../../Layout/Hideable';
import ArticleLink from '../Article/Link';
import MajorLink from '../../Majors/Major/Link';
import { articleShape } from '../../../shapes';
import { themeStyles, breakpointsKeys } from '../../../theme';
import articlePlaceholder from '../../../images/article.png';

const { Item } = List;
const { Meta } = Item;

const styles = {
  shortDescription: themeStyles.justifiedTextContainer,
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '200px',
  },
  image: {
    height: '150px',
  },
  majorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  majorIcon: {
    fontSize: '20px',
    marginRight: '5px',
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

function renderExtra(previewUrl) {
  return (
    <Hideable breakpoint={breakpointsKeys.xs} style={styles.imageWrapper}>
      <img alt="summary-logo" src={previewUrl || articlePlaceholder} style={styles.image} />
    </Hideable>
  );
}

function renderMeta(article) {
  const titleTag = (
    <span>
      <ArticleLink id={article.id} majorId={article.majorId}>{article.title}</ArticleLink>
    </span>
  );

  const authorName = <Author author={article.author} spanned />;

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
  displayMajor,
  onTagClick,
  intl: { formatMessage: t },
}) {
  const actions = renderActions(adminOrMajorAdmin, article);
  const extra = renderExtra(article.previewUrl);

  return (
    <Item actions={actions} extra={extra}>
      {renderMeta(article, t)}
      {displayMajor &&
        <span style={styles.majorContainer}>
          <Icon type="pushpin" style={styles.majorIcon} />
          <MajorLink id={article.majorId}>{article.majorSummary.name}</MajorLink>
        </span>
      }
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
  displayMajor: PropTypes.bool.isRequired,
  onTagClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(ArticleListItem));
