import { connect } from 'react-redux';
import { toggleAdmin, getIsAdminUpdating } from '../../../store/ducks/admins';
import Switch from '../../../components/Users/AdminStatus/Switch';

function mapStateToProps(state, ownProps) {
  return {
    updating: getIsAdminUpdating(state, ownProps),
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
