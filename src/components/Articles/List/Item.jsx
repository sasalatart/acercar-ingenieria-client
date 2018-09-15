import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Linkify from 'react-linkify';
import LikeButton from '../../../containers/FeedButtons/LikeButton';
import DestroyButton from '../../../containers/DestroyButton';
import TagList from '../../Layout/TagList';
import Hideable from '../../Layout/Hideable';
import Image from '../../Layout/Image';
import Author from '../../Author';
import IconText from '../../Icons/IconText';
import ArticleLink from '../Article/Link';
import MajorLink from '../../Majors/Major/Link';
import { breakpointsKeys } from '../../../theme';
import { articleSummaryShape } from '../../../shapes';
import articlePlaceholder from '../../../images/article.png';
import collections from '../../../lib/collections';

const { Item } = List;
const { Meta } = Item;

const styles = {
  shortDescription: {
    whiteSpace: 'pre-wrap',
  },
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

function renderActions(currentUserId, adminOrMajorAdmin, article) {
  const { id, commentsCount, likesCount } = article;
  const isAuthor = currentUserId === article.author.id;

  const actions = [
    <LikeButton likesCount={likesCount} iconOnly disabled />,
    <IconText icon={['far', 'comment']} text={commentsCount} />,
  ];

  if (isAuthor || adminOrMajorAdmin) {
    const destroyButton = <DestroyButton id={id} collection={collections.articles} iconOnly />;
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
      {!article.approved && <FontAwesomeIcon icon="lock" style={styles.icon} />}
      <ArticleLink id={article.id} majorId={majorId}>{article.title}</ArticleLink>
    </span>
  );

  const authorName = <Author author={article.author} spanned />;

  return <Meta title={titleTag} description={authorName} />;
}

function renderShortDescription(id, shortDescription) {
  return (
    <Linkify>
      <p style={styles.shortDescription}>{shortDescription}</p>
      <ArticleLink id={id}>
        <FormattedMessage id="articles.readMore" />
      </ArticleLink>
    </Linkify>
  );
}

function ArticleListItem({
  currentUserId,
  adminOrMajorAdmin,
  article,
  displayMajor,
  onTagClick,
}) {
  const majorId = article.majorSummary && article.majorSummary.id;
  const actions = renderActions(currentUserId, adminOrMajorAdmin, article);
  const extra = renderExtra(article.previewUrl);

  return (
    <Item actions={actions} extra={extra}>
      {renderMeta(article, majorId)}
      {displayMajor &&
        <span style={styles.majorContainer}>
          <MajorLink id={majorId}>
            <FontAwesomeIcon icon="university" style={styles.icon} />
            {article.majorSummary.name}
          </MajorLink>
        </span>
      }
      {article.categoryList.length > 0 &&
        <TagList tags={article.categoryList} onTagClick={onTagClick} withIcon />
      }
      {renderShortDescription(article.id, article.shortDescription)}
    </Item>
  );
}

ArticleListItem.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  article: articleSummaryShape.isRequired,
  displayMajor: PropTypes.bool.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default ArticleListItem;
