import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import Pagination from '../../../containers/Layout/Pagination';
import Title from '../../Layout/Title';
import ActionBar from './ActionBar';
import ListItem from './Item';
import { paginationInfoShape, articleSummaryShape } from '../../../shapes';
import { suffixes } from '../../../lib/articles';

export default class ArticlesList extends Component {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    suffix: PropTypes.string.isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    articleSummaries: PropTypes.arrayOf(articleSummaryShape).isRequired,
    loadArticles: PropTypes.func.isRequired,
    onTagClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
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
      noData,
      suffix,
      paginationInfo,
      articleSummaries,
      loadArticles: load,
      ...restProps
    } = this.props;

    return (
      <Fragment>
        <ActionBar suffix={suffix} {...restProps} />
        <Title>
          {suffix === suffixes.approved
            ? <FormattedMessage id="articles" />
            : <FormattedMessage id={`articles.${suffix}`} />
          }
        </Title>

        <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={articleSummaries}
            renderItem={this.renderListItem}
          />
        </Pagination>
      </Fragment>
    );
  }
}
