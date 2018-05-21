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
import FeedButtons from '../../FeedButtons';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';
import DateWithFormat from '../../DateWithFormat';
import RichText from '../../RichText';
import Attachments from '../../Attachments';
import CommentsSection from '../../Comments/Section';
import TagList from '../../TagList';
import Author from '../../Author';
import MajorLink from '../../Majors/Major/Link';
import Image from '../../Image';
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
  picture: {
    overflow: 'hidden',
  },
};

function renderContent(article) {
  return (
    <Fragment>
      <Divider />

      <Row gutter={24}>
        <Col sm={9}>
          <div style={styles.mediaContainer}>
            <Image src={article.previewUrl || articlePlaceholder} style={styles.picture} />
          </div>
        </Col>
        <Col sm={15}>
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
        <Fragment>
          <Divider />
          <Attachments attachments={article.attachments} />
        </Fragment>
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
  const { title, majorSummary, categoryList } = article;

  return (
    <Fragment>
      <ActionBar article={article} />
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

      <FeedButtons resource={article} baseResourceName="articles" />

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
