import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import ArticleListItem from './Item';
import { paginationShape, articleShape } from '../../../shapes';

export default class ArticlesList extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    articles: PropTypes.arrayOf(articleShape),
    loadArticles: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    articles: [],
  }

  renderListItem = article => (
    <ArticleListItem article={article} adminOrMajorAdmin={this.props.adminOrMajorAdmin} />
  )

  render() {
    const { loading, pagination, loadArticles } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        loadFn={loadArticles}
        render={() => (
          <List
            itemLayout="vertical"
            size="large"
            dataSource={this.props.articles}
            renderItem={this.renderListItem}
          />
        )}
      />
    );
  }
}
