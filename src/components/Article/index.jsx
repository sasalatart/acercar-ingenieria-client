import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Row, Col, Divider } from 'antd';
import Linkify from 'react-linkify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import DataPlaceholder from '../DataPlaceholder';
import ArticleActionBar from '../../containers/Article/ActionBar';
import Title from '../Layout/Title';
import SubTitle from '../Layout/SubTitle';
import DateWithFormat from '../DateWithFormat';
import RichText from '../RichText';
import Attachments from '../Attachments';
import Comments from '../Comments';
import TagList from '../TagList';
import { articleShape } from '../../shapes';
import { themeStyles } from '../../theme';
import ROUTES from '../../routes';
import articlePlaceholder from '../../images/article.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  author: {
    fontWeight: 'bold',
    fontSize: '1.25em',
    margin: '5px 0',
  },
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
};

export default class Article extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    article: articleShape,
    loadArticle: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    article: undefined,
  }

  componentDidMount() {
    this.props.loadArticle();
  }

  renderSubtitle() {
    const { majorSummary } = this.props.article;

    if (!majorSummary) {
      return null;
    }

    const href = ROUTES.MAJOR(majorSummary.id);
    return (
      <Link to={href} href={href}>
        <SubTitle text={majorSummary.name} />
      </Link>
    );
  }

  renderAuthor() {
    const { article: { author }, intl: { formatMessage: t } } = this.props;

    const href = ROUTES.USER(author.id);
    const authorName = `${author.firstName} ${author.lastName}`;

    return (
      <p style={styles.author}>
        <Link to={href} href={href}>
          {t({ id: 'articles.author' }, { authorName })}
        </Link>
      </p>
    );
  }

  renderShortDescription() {
    const { shortDescription } = this.props.article;

    return (
      <Linkify>
        <p style={styles.shortDescription}>{shortDescription}</p>
      </Linkify>
    );
  }

  render() {
    const { loggedIn, loading, article } = this.props;

    const noData = !loading && !article;
    if (loading || noData) {
      return <DataPlaceholder noData={noData} absolute />;
    }

    return (
      <div>
        <ArticleActionBar article={article} />

        <Title text={article.title} />
        {this.renderSubtitle()}

        {article.categoryList.length > 0 &&
          <div style={styles.tagsContainer}>
            <TagList tags={article.categoryList} />
          </div>
        }

        <Divider />

        <Row gutter={24}>
          <Col sm={6}>
            <div style={styles.mediaContainer}>
              <img src={get(article.picture, 'medium', articlePlaceholder)} alt="major-logo" />
            </div>
          </Col>
          <Col sm={18}>
            {this.renderAuthor()}
            <DateWithFormat dateString={article.createdAt} style={styles.date} />
            {this.renderShortDescription()}
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

        {loggedIn &&
          <div>
            <Divider />
            <Comments baseResourceName="articles" baseResourceId={article.id} />
          </div>
        }
      </div>
    );
  }
}
