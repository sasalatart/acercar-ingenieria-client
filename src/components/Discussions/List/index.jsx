import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Layout/Pagination';
import Title from '../../Layout/Title';
import ActionBar from './ActionBar';
import DiscussionListItem from './Item';
import { paginationInfoShape, discussionSummaryShape } from '../../../shapes';

export default class DiscussionsList extends Component {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    admin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    discussionSummaries: PropTypes.arrayOf(discussionSummaryShape).isRequired,
    mine: PropTypes.bool,
    loadDiscussions: PropTypes.func.isRequired,
    onTagClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mine: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mine !== this.props.mine) {
      this.props.loadDiscussions({ page: 1 });
    }
  }

  renderListItem = discussion => (
    <DiscussionListItem
      currentUserId={this.props.currentUserId}
      admin={this.props.admin}
      discussion={discussion}
      onTagClick={this.props.onTagClick}
    />
  )

  render() {
    const {
      loading,
      paginationInfo,
      discussionSummaries,
      mine,
      loadDiscussions,
      ...restProps
    } = this.props;

    return (
      <Fragment>
        <ActionBar mine={mine} {...restProps} />
        <Title>
          <FormattedMessage id={mine ? 'discussions.mine' : 'discussions'} />
        </Title>

        <PaginationControls
          paginationInfo={paginationInfo}
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
