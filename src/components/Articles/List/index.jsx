import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import ActionBar from '../../../containers/Articles/List/ActionBar';
import Title from '../../Layout/Title';
import ListItem from './Item';
import { paginationShape, articleShape } from '../../../shapes';
import { suffixes } from '../../../lib/articles';

export default class ArticlesList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    suffix: PropTypes.string.isRequired,
    pagination: paginationShape,
    articles: PropTypes.arrayOf(articleShape),
    loadArticles: PropTypes.func.isRequired,
    onTagClick: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    pagination: undefined,
    articles: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suffix !== this.props.suffix) {
      this.props.loadArticles({ page: 1 });
    }
  }

  renderListItem = article => (
    <ListItem
      article={article}
      displayMajor={!this.props.majorId && !!article.majorSummary}
      onTagClick={this.props.onTagClick}
    />
  )

  render() {
    const {
      loading,
      majorId,
      suffix,
      pagination,
      articles,
      loadArticles,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <Fragment>
        <ActionBar majorId={majorId} suffix={suffix} />
        <Title>
          {suffix === suffixes.approved ? t({ id: 'articles' }) : t({ id: `articles.${suffix}` })}
        </Title>

        <PaginationControls
          pagination={pagination}
          loading={loading}
          noData={!loading && isEmpty(articles)}
          loadFn={loadArticles}
          render={() => (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={articles}
              renderItem={this.renderListItem}
            />
          )}
        />
      </Fragment>
    );
  }
}
