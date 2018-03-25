import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import ActionBar from '../../../containers/Articles/List/ActionBar';
import Title from '../../Layout/Title';
import ListItem from './Item';
import { paginationShape, articleShape } from '../../../shapes';

export default class ArticlesList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
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

  renderListItem = article => (
    <ListItem article={article} onTagClick={this.props.onTagClick} />
  )

  render() {
    const {
      loading, majorId, pagination, articles, loadArticles, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <ActionBar majorId={majorId} />
        <Title text={t({ id: 'articles' })} />

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
      </div>
    );
  }
}
