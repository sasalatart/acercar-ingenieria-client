import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { loadNotifications, getPagingFns } from '../../store/ducks/notifications';
import { getIsFetching } from '../../store/ducks/loading';
import NotificationsList from '../../components/Notifications/List';
import { notificationsCollection as collection } from '../../lib/collections';
import { getSuffix } from '../../lib/notifications';

function mapStateToProps(state, { seen }) {
  const params = { collection, suffix: getSuffix(seen), paged: true };

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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
export default injectIntl(connectedComponent);
