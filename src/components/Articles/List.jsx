import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { Set } from 'immutable';
import { List } from 'antd';
import PaginationControls from '../Pagination';
import IconText from '../IconText';
import LikeButton from '../../containers/LikeButton';
import DestroyButton from '../../containers/Articles/DestroyButton';
import { paginationShape, articleShape } from '../../shapes';
import ROUTES from '../../routes';
import articlePlaceholder from '../../images/article.png';

const { Item } = List;
const { Meta } = Item;

export default class ArticlesList extends Component {
  static propTypes = {
    majorId: PropTypes.number,
    defaultPage: PropTypes.number.isRequired,
    pagination: paginationShape,
    articles: ImmutablePropTypes.setOf(articleShape),
    hasAdminPrivileges: PropTypes.bool.isRequired,
    loadArticles: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    pagination: undefined,
    articles: Set(),
  }

  componentDidMount() {
    const { majorId, defaultPage, loadArticles } = this.props;
    loadArticles(defaultPage, majorId);
  }

  handlePageChange = (page) => {
    const { majorId, loadArticles, addQueryToCurrentUri } = this.props;
    addQueryToCurrentUri({ page });
    loadArticles(page, majorId);
  }

  renderListItem = (article) => {
    const actions = [
      <IconText type="message" text={article.commentsCount} />,
      <LikeButton
        collectionName="articles"
        resourceId={article.id}
        likedByCurrentUser={article.likedByCurrentUser}
        likesCount={article.likesCount}
        iconOnly
      />,
    ];

    const { hasAdminPrivileges, majorId } = this.props;
    if (hasAdminPrivileges) {
      actions.push(<DestroyButton id={article.id} majorId={majorId} iconOnly />);
    }

    const titleHref = ROUTES.ARTICLE(article.id, article.majorId);
    const title = <Link to={titleHref} href={titleHref}>{article.title}</Link>;

    const imageSrc = article.picture ? article.picture.medium : articlePlaceholder;
    const image = <img alt="summary-logo" src={imageSrc} />;

    const authorHref = ROUTES.USER(article.author.id);
    const authorName = (
      <Link to={authorHref} href={authorHref}>
        {`${article.author.firstName} ${article.author.lastName}`}
      </Link>
    );

    return (
      <Item key={article.id} actions={actions} extra={image}>
        <Meta title={title} description={authorName} />
        {article.shortDescription}
      </Item>
    );
  }

  render() {
    const { pagination, articles } = this.props;

    return (
      <PaginationControls pagination={pagination} onPageChange={this.handlePageChange}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={articles.toArray()}
          renderItem={this.renderListItem}
        />
      </PaginationControls>
    );
  }
}
