import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';
import DiscussionListItem from './Item';
import { paginationShape, discussionShape } from '../../../shapes';

export default class DiscussionsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    discussions: PropTypes.arrayOf(discussionShape),
    mine: PropTypes.bool,
    loadDiscussions: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    discussions: [],
    mine: false,
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
      loading, pagination, discussions, mine, loadDiscussions, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <ActionBar mine={mine} />
        <Title text={t({ id: mine ? 'discussions.mine' : 'discussions' })} />

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
      </div>
    );
  }
}
