import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import DiscussionListItem from './Item';
import { paginationShape, discussionShape } from '../../../shapes';

class DiscussionsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    mine: PropTypes.bool.isRequired,
    pagination: paginationShape,
    discussions: PropTypes.arrayOf(discussionShape),
    loadDiscussions: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    discussions: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mine !== this.props.mine) {
      nextProps.loadDiscussions();
    }
  }

  renderListItem = discussion => (
    <DiscussionListItem discussion={discussion} />
  )

  render() {
    const {
      loading, pagination, discussions, loadDiscussions,
    } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(discussions)}
        loadFn={loadDiscussions}
        render={() => (
          <List
            itemLayout="vertical"
            size="large"
            dataSource={discussions}
            renderItem={this.renderListItem}
          />
        )}
      />
    );
  }
}

export default DiscussionsList;
