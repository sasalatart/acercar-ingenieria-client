import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Set } from 'immutable';
import { List } from 'antd';
import PaginationControls from '../Pagination';
import IconText from '../IconText';
import LikeButton from '../../containers/LikeButton';
import DestroyButton from '../../containers/Articles/DestroyButton';
import { paginationShape, articleShape } from '../../shapes';
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
      />,
    ];

    const { hasAdminPrivileges, majorId, defaultPage } = this.props;
    if (hasAdminPrivileges) {
      actions.push(<DestroyButton id={article.id} majorId={majorId} page={defaultPage} iconOnly />);
    }

    const imageSrc = article.picture ? article.picture.medium : articlePlaceholder;
    const image = <img alt="summary-logo" src={imageSrc} />;

    const authorName = `${article.author.firstName} ${article.author.lastName}`;

    return (
      <Item key={article.id} actions={actions} extra={image}>
        <Meta title={article.title} description={authorName} />
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
