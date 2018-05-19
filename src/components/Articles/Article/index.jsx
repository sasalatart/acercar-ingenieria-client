import React, { Fragment } from 'react';
import { intlShape } from 'react-intl';
import {
  Alert,
  Row,
  Col,
  Divider,
} from 'antd';
import Linkify from 'react-linkify';
import isEmpty from 'lodash/isEmpty';
import ActionBar from '../../../containers/Articles/Article/ActionBar';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';
import DateWithFormat from '../../DateWithFormat';
import RichText from '../../RichText';
import Attachments from '../../Attachments';
import CommentsSection from '../../Comments/Section';
import TagList from '../../TagList';
import Author from '../../Author';
import MajorLink from '../../Majors/Major/Link';
import { articleShape } from '../../../shapes';
import { themeStyles } from '../../../theme';
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
  picture: themeStyles.mediumImage,
};

function renderContent(article) {
  return (
    <Fragment>
      <Divider />

      <Row gutter={24}>
        <Col sm={6}>
          <div style={styles.mediaContainer}>
            <img
              src={article.previewUrl || articlePlaceholder}
              alt="article-logo"
              style={styles.picture}
            />
          </div>
        </Col>
        <Col sm={18}>
          <Author author={article.author} />
          <DateWithFormat dateString={article.createdAt} style={styles.date} withTime />

          <Linkify>
            <p style={styles.shortDescription}>{article.shortDescription}</p>
          </Linkify>
        </Col>
      </Row>

      <Divider />
      <RichText content={article.content} />

      {!isEmpty(article.attachments) &&
        <div>
          <Divider />
          <Attachments attachments={article.attachments} />
        </div>
      }

      <Divider />
      <CommentsSection
        baseResourceName="articles"
        baseResourceId={article.id}
        disabled={!article.approved}
      />
    </Fragment>
  );
}

function Article({ article, intl: { formatMessage: t } }) {
  const { majorSummary } = article;

  return (
    <Fragment>
      <ActionBar article={article} />
      <Title>{article.title}</Title>

      {majorSummary &&
        <SubTitle>
          <MajorLink id={majorSummary.id}>{majorSummary.name}</MajorLink>
        </SubTitle>
      }

      {article.categoryList.length > 0 &&
        <div style={styles.tagsContainer}>
          <TagList tags={article.categoryList} />
        </div>
      }

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
  article: articleShape.isRequired,
  intl: intlShape.isRequired,
};

export default Article;
