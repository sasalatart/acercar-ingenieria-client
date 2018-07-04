import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';
import ListItem from './Item';
import { paginationShape, articleSummaryShape } from '../../../shapes';
import { suffixes } from '../../../lib/articles';

export default class ArticlesList extends Component {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    suffix: PropTypes.string.isRequired,
    pagination: paginationShape,
    articleSummaries: PropTypes.arrayOf(articleSummaryShape),
    loadArticles: PropTypes.func.isRequired,
    onTagClick: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    pagination: undefined,
    articleSummaries: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suffix !== this.props.suffix) {
      this.props.loadArticles({ page: 1 });
    }
  }

  renderListItem = article => (
    <ListItem
      currentUserId={this.props.currentUserId}
      adminOrMajorAdmin={this.props.adminOrMajorAdmin}
      article={article}
      displayMajor={!this.props.majorId && !!article.majorSummary}
      onTagClick={this.props.onTagClick}
    />
  )

  render() {
    const {
      loading,
      suffix,
      pagination,
      articleSummaries,
      loadArticles,
      intl: { formatMessage: t },
      ...restProps
    } = this.props;

    return (
      <Fragment>
        <ActionBar suffix={suffix} {...restProps} />
        <Title>
          {suffix === suffixes.approved
            ? t({ id: 'articles' })
            : t({ id: `articles.${suffix}` })
          }
        </Title>

        <PaginationControls
          pagination={pagination}
          loading={loading}
          noData={!loading && isEmpty(articleSummaries)}
          loadFn={loadArticles}
          render={() => (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={articleSummaries}
              renderItem={this.renderListItem}
            />
          )}
        />
      </Fragment>
    );
  }
}
