import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { getIsUpdating } from '../../store/ducks/loading';
import { setAllAsSeen, getPagingFns } from '../../store/ducks/notifications';
import Notifications from '../../components/Notifications';
import collections from '../../lib/collections';
import { suffixes } from '../../lib/notifications';

function mapStateToProps(state) {
  const params = { collection: collections.notifications, suffix: suffixes.pending };
  const pagingFns = getPagingFns(params, true).selectors;

  return {
    noPendingNotifications: isEmpty(pagingFns.getPagedEntities(state, params)),
    settingAllAsSeen: getIsUpdating(state, { ...params, suffix: suffixes.seen }),
  };
}

const mapDispatchToProps = {
  setAllAsSeen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
