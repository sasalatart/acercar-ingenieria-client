import { connect } from 'react-redux';
import { loadNotifications, getPaginationData, getIsLoadingNotifications } from '../../store/ducks/notifications';
import { getPlaceholderFlags } from '../../store/ducks/shared';
import NotificationsList from '../../components/Notifications/List';
import { getSuffix } from '../../lib/notifications';

function mapStateToProps(state, { seen }) {
  const params = { suffix: getSuffix(seen) };
  const { paginationInfo, pagedEntities: notifications } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoadingNotifications(state, params), notifications),
    paginationInfo,
    notifications,
  };
}

function mapDispatchToProps(dispatch, { seen }) {
  return {
    loadNotifications: query => dispatch(loadNotifications({ suffix: getSuffix(seen), query })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
