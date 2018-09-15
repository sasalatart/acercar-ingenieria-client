import { connect } from 'react-redux';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { toggleAdmin, getIsTogglingAdmin } from '../../../store/ducks/admins';
import Switch from '../../../components/Users/AdminStatus/Switch';

function mapStateToProps(state, { userId, majorId }) {
  const params = { id: userId, baseId: majorId };
  return {
    currentUserId: getCurrentUserId(state),
    updating: getIsTogglingAdmin(state, params),
  };
}

function mapDispatchToProps(dispatch, { userId, majorId, active }) {
  return {
    onChange: () => dispatch(toggleAdmin(userId, !active, majorId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
