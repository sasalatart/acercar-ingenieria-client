import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Alert,
  Row,
  Col,
  Divider,
} from 'antd';
import Linkify from 'react-linkify';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';
import MediaContent from '../../Layout/MediaContent';
import DateWithFormat from '../../Layout/DateWithFormat';
import TagList from '../../Layout/TagList';
import Image from '../../Layout/Image';
import ActionBar from './ActionBar';
import FeedButtons from '../../FeedButtons';
import CommentsSection from '../../Comments/Section';
import Author from '../../Author';
import MajorLink from '../../Majors/Major/Link';
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
    whiteSpace: 'pre-wrap',
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
        baseCollection={collections.articles}
        baseId={article.id}
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
        baseCollection={collections.articles}
        disabled={!article.approved}
      />

      {!article.approved &&
        <Alert
          type="warning"
          message={<FormattedMessage id="articles.notApprovedYet.message" />}
          description={<FormattedMessage id="articles.notApprovedYet.description" />}
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
};

export default Article;
