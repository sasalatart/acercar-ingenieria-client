import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadNotifications,
  getPagingFns,
} from '../../../../store/ducks/notifications';
import { getIsFetching } from '../../../../store/ducks/loading';
import NotificationsList from '../../../../components/Users/Profile/Notifications/List';

function mapStateToProps(state, { seen }) {
  const params = { collection, suffix: seen ? 'seen' : 'pending', paged: true };

  const pagingFns = getPagingFns(seen);
  const notifications = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: isEmpty(notifications) && getIsFetching(state, params),
    pagination: pagingFns.selectors.getMeta(state, params),
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
