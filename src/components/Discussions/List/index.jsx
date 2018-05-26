import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import ActionBar from '../../../containers/Discussions/List/ActionBar';
import Title from '../../Layout/Title';
import DiscussionListItem from './Item';
import { paginationShape, discussionSummaryShape } from '../../../shapes';

export default class DiscussionsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    discussionSummaries: PropTypes.arrayOf(discussionSummaryShape),
    mine: PropTypes.bool,
    loadDiscussions: PropTypes.func.isRequired,
    onTagClick: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    discussionSummaries: [],
    mine: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mine !== this.props.mine) {
      this.props.loadDiscussions({ page: 1 });
    }
  }

  renderListItem = discussion => (
    <DiscussionListItem discussion={discussion} onTagClick={this.props.onTagClick} />
  )

  render() {
    const {
      loading,
      pagination,
      discussionSummaries,
      mine,
      loadDiscussions,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <Fragment>
        <ActionBar mine={mine} />
        <Title>{t({ id: mine ? 'discussions.mine' : 'discussions' })}</Title>

        <PaginationControls
          pagination={pagination}
          loading={loading}
          noData={!loading && isEmpty(discussionSummaries)}
          loadFn={loadDiscussions}
          render={() => (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={discussionSummaries}
              renderItem={this.renderListItem}
            />
          )}
        />
      </Fragment>
    );
  }
}
