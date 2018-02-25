import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Tag, Row, Col, Divider } from 'antd';
import get from 'lodash/get';
import Spinner from '../Spinner';
import ArticleActionBar from '../../containers/Article/ActionBar';
import Title from '../Layout/Title';
import SubTitle from '../Layout/SubTitle';
import RichText from '../RichText';
import DateWithFormat from '../DateWithFormat';
import { articleShape } from '../../shapes';
import { colors, themeStyles } from '../../theme';
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
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default class Article extends Component {
  static propTypes = {
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

  renderCategoryList() {
    const { categoryList } = this.props.article;

    if (!categoryList.length) return null;

    const taggedCategories = categoryList
      .map(category => <Tag key={category} color={colors.primaryDark}>{category}</Tag>);

    return (
      <div style={styles.tagsContainer}>
        {taggedCategories}
      </div>
    );
  }

  render() {
    const { loading, article } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        <ArticleActionBar article={article} />

        <Title text={article.title} />
        {this.renderSubtitle()}
        {this.renderCategoryList()}

        <Divider />

        <Row gutter={24}>
          <Col sm={8}>
            <div style={styles.mediaContainer}>
              <img src={get(article.picture, 'medium', articlePlaceholder)} alt="major-logo" />
            </div>
          </Col>
          <Col sm={16}>
            {this.renderAuthor()}
            <DateWithFormat dateString={article.createdAt} style={styles.date} />
            <p style={styles.shortDescription}>{article.shortDescription}</p>
          </Col>
        </Row>

        <Divider />

        <RichText content={article.content} />
      </div>
    );
  }
}
