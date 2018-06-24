import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import {
  Alert,
  Row,
  Col,
  Divider,
} from 'antd';
import Linkify from 'react-linkify';
import ActionBar from './ActionBar';
import FeedButtons from '../../FeedButtons';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';
import MediaContent from '../../Layout/MediaContent';
import DateWithFormat from '../../DateWithFormat';
import CommentsSection from '../../Comments/Section';
import TagList from '../../TagList';
import Author from '../../Author';
import MajorLink from '../../Majors/Major/Link';
import Image from '../../Image';
import { themeStyles } from '../../../theme';
import { articleShape, articleSummaryShape } from '../../../shapes';
import collections from '../../../lib/collections';
import articlePlaceholder from '../../../images/article.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  date: {
    fontWeight: 'bold',
  },
  shortDescription: {
    marginTop: '25px',
    ...themeStyles.justifiedTextContainer,
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  picture: {
    overflow: 'hidden',
  },
};

function renderContent(article) {
  return (
    <Fragment>
      <Divider />

      <Row gutter={24}>
        <Col sm={15}>
          <Author author={article.author} />
          <DateWithFormat dateString={article.createdAt} style={styles.date} withTime />

          <Linkify>
            <p style={styles.shortDescription}>{article.shortDescription}</p>
          </Linkify>
        </Col>
        <Col sm={9}>
          <div style={styles.mediaContainer}>
            <Image src={article.previewUrl || articlePlaceholder} style={styles.picture} />
          </div>
        </Col>
      </Row>

      <Divider />
      <MediaContent richText={article.content} attachments={article.attachments} />

      <Divider />
      <CommentsSection
        baseResourceName={collections.articles}
        baseResourceId={article.id}
        disabled={!article.approved}
      />
    </Fragment>
  );
}

function Article({
  article,
  article: {
    title,
    majorSummary,
    categoryList,
  },
  intl: { formatMessage: t },
  ...restProps
}) {
  return (
    <Fragment>
      <ActionBar article={article} {...restProps} />
      <Title>{title}</Title>

      {majorSummary &&
        <SubTitle>
          <MajorLink id={majorSummary.id}>{majorSummary.name}</MajorLink>
        </SubTitle>
      }

      {categoryList.length > 0 &&
        <div style={styles.tagsContainer}>
          <TagList tags={categoryList} />
        </div>
      }

      <FeedButtons
        resource={article}
        baseResourceName={collections.articles}
        disabled={!article.approved}
      />

      {!article.approved &&
        <Alert
          type="warning"
          message={t({ id: 'articles.approvalPending.message' })}
          description={t({ id: 'articles.approvalPending.description' })}
          showIcon
        />
      }

      {renderContent(article)}
    </Fragment>
  );
}

Article.propTypes = {
  article: PropTypes.oneOfType([
    articleShape,
    articleSummaryShape,
  ]).isRequired,
  intl: intlShape.isRequired,
};

export default Article;
