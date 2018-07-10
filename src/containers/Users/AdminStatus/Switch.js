import { connect } from 'react-redux';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { toggleAdmin } from '../../../store/ducks/admins';
import { getIsUpdating } from '../../../store/ducks/loading';
import Switch from '../../../components/Users/AdminStatus/Switch';
import { getCollectionParams } from '../../../lib/users';

function mapStateToProps(state, { userId, majorId }) {
  const params = getCollectionParams(majorId, { id: userId });

  return {
    currentUserId: getCurrentUserId(state),
    updating: getIsUpdating(state, params),
  };
}

function mapDispatchToProps(dispatch, { userId, majorId, active }) {
  return {
    onChange: () => dispatch(toggleAdmin(userId, majorId, !active)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Switch);
