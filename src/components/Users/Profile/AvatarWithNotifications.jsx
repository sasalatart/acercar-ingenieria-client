import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import UserAvatar from './Avatar';
import { userShape } from '../../../shapes';
import PusherService, { CHANNELS, EVENTS } from '../../../services/pusher';
import routes from '../../../lib/routes';

export default class AvatarWithNotifications extends Component {
  static propTypes = {
    currentUser: userShape.isRequired,
    notificationsCount: PropTypes.number.isRequired,
    loadNotificationsCount: PropTypes.func.isRequired,
    setNotificationsCount: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    style: undefined,
  };

  componentDidMount() {
    const { currentUser, loadNotificationsCount, setNotificationsCount } = this.props;
    loadNotificationsCount();

    const pusher = PusherService.getInstance();
    const countChannel = pusher.subscribe(CHANNELS.USER(currentUser.id));
    countChannel.bind(EVENTS.NOTIFICATIONS_COUNT, setNotificationsCount);
  }

  componentWillUnmount() {
    const pusher = PusherService.getInstance();
    if (!pusher) return;
    pusher.unsubscribe(CHANNELS.USER(this.props.currentUser.id));
  }

  render() {
    const { currentUser, notificationsCount, style } = this.props;

    return (
      <Link to={routes.profile} href={routes.profile} style={style}>
        <Badge count={notificationsCount}>
          <UserAvatar user={currentUser} />
        </Badge>
      </Link>
    );
  }
}
