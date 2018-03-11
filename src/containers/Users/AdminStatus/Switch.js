import { connect } from 'react-redux';
import {
  promoteToAdmin,
  demoteFromAdmin,
  getIsAdminUpdating,
} from '../../../store/ducks/admins';
import Switch from '../../../components/Users/AdminStatus/Switch';

function mapStateToProps(state, ownProps) {
  const params = { userId: ownProps.userId, majorId: ownProps.majorId };

  return {
    updating: getIsAdminUpdating(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const toggleFn = ownProps.active ? demoteFromAdmin : promoteToAdmin;

  return {
    onChange: () => dispatch(toggleFn(ownProps.userId, ownProps.majorId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Switch);
