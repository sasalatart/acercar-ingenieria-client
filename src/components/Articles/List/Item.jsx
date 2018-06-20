import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import Linkify from 'react-linkify';
import WithAuthorization from '../../../hoc/WithAuthorization';
import LikeButton from '../../../containers/FeedButtons/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import Author from '../../Author';
import TagList from '../../TagList';
import IconText from '../../IconText';
import Hideable from '../../Layout/Hideable';
import ArticleLink from '../Article/Link';
import MajorLink from '../../Majors/Major/Link';
import Image from '../../Image';
import { themeStyles, breakpointsKeys } from '../../../theme';
import { articleSummaryShape } from '../../../shapes';
import collections from '../../../lib/collections';
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
  majorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  icon: {
    fontSize: '20px',
    marginRight: '5px',
  },
};

function renderActions(adminOrMajorAdmin, article, majorId) {
  const { id, commentsCount, likesCount } = article;

  const actions = [
    <LikeButton likesCount={likesCount} iconOnly disabled />,
    <IconText type="message" text={commentsCount} />,
  ];

  if (adminOrMajorAdmin) {
    const destroyButton = (
      <DestroyButton collection={collections.articles} id={id} baseResourceId={majorId} iconOnly />
    );

    actions.push(destroyButton);
  }

  return actions;
}

function renderExtra(previewUrl) {
  return (
    <Hideable breakpoint={breakpointsKeys.xs} style={styles.imageWrapper}>
      <Image src={previewUrl || articlePlaceholder} />
    </Hideable>
  );
}

function renderMeta(article, majorId) {
  const titleTag = (
    <span>
      {!article.approved && <Icon type="lock" style={styles.icon} />}
      <ArticleLink id={article.id} majorId={majorId}>{article.title}</ArticleLink>
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
  const majorId = article.majorSummary && article.majorSummary.id;
  const actions = renderActions(adminOrMajorAdmin, article, majorId);
  const extra = renderExtra(article.previewUrl);

  return (
    <Item actions={actions} extra={extra}>
      {renderMeta(article, majorId)}
      {displayMajor &&
        <span style={styles.majorContainer}>
          <Icon type="pushpin" style={styles.icon} />
          <MajorLink id={majorId}>{article.majorSummary.name}</MajorLink>
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
  article: articleSummaryShape.isRequired,
  displayMajor: PropTypes.bool.isRequired,
  onTagClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(ArticleListItem));
