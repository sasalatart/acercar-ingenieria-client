import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Set } from 'immutable';
import { List } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import DiscussionListItem from './Item';
import { paginationShape, discussionShape } from '../../../shapes';

class DiscussionsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    mine: PropTypes.bool.isRequired,
    pagination: paginationShape,
    discussions: ImmutablePropTypes.setOf(discussionShape),
    loadDiscussions: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    discussions: Set(),
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
        loadFn={loadDiscussions}
        render={() => (
          <List
            itemLayout="vertical"
            size="large"
            dataSource={discussions.toJS()}
            renderItem={this.renderListItem}
          />
        )}
      />
    );
  }
}

export default DiscussionsList;
