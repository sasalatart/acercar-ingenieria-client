import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { setAllAsSeen, getPaginationData, getIsSettingAllAsSeen } from '../../store/ducks/notifications';
import Notifications from '../../components/Notifications';
import { suffixes } from '../../lib/notifications';

function mapStateToProps(state) {
  const { pagedEntities } = getPaginationData(state, { suffix: suffixes.unseen });
  return {
    noUnseenNotifications: isEmpty(pagedEntities),
    settingAllAsSeen: getIsSettingAllAsSeen(state),
  };
}

const mapDispatchToProps = {
  setAllAsSeen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
