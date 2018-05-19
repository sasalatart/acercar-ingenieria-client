import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../containers/Pagination';
import Notification from '../../containers/Notifications/Notification';
import { paginationShape, notificationShape } from '../../shapes';

export default class NotificationsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    seen: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(notificationShape),
    pagination: paginationShape,
    loadNotifications: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notifications: [],
    pagination: undefined,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seen !== this.props.seen) {
      this.props.loadNotifications({ page: 1 });
    }
  }

  renderItem = notification => (
    <div key={notification.id}>
      <Divider />
      <Notification notification={notification} />
    </div>
  );

  render() {
    const {
      loading, pagination, notifications, loadNotifications,
    } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(notifications)}
        loadFn={loadNotifications}
        render={() => notifications.map(this.renderItem)}
      />
    );
  }
}
