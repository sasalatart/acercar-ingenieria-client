import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { loadNotifications, getPagingFns } from '../../store/ducks/notifications';
import { getIsFetching } from '../../store/ducks/loading';
import NotificationsList from '../../components/Notifications/List';
import collections from '../../lib/collections';
import { getSuffix } from '../../lib/notifications';

function mapStateToProps(state, { seen }) {
  const params = { collection: collections.notifications, suffix: getSuffix(seen), paged: true };

  const pagingFns = getPagingFns(params, true).selectors;
  const notifications = pagingFns.getPagedEntities(state, params);

  return {
    loading: isEmpty(notifications) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    notifications,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadNotifications: ({ page }) => dispatch(loadNotifications(page, ownProps.seen)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
