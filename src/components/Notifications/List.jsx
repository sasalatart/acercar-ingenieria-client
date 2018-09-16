import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import Pagination from '../../containers/Layout/Pagination';
import Notification from '../../containers/Notifications/Notification';
import { paginationInfoShape, notificationShape } from '../../shapes';

export default class NotificationsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    seen: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(notificationShape).isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    loadNotifications: PropTypes.func.isRequired,
  };

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
      loading,
      noData,
      paginationInfo,
      notifications,
      loadNotifications: load,
    } = this.props;

    return (
      <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
        {notifications.map(this.renderItem)}
      </Pagination>
    );
  }
}
