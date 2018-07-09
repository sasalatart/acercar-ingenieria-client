import { connect } from 'react-redux';
import { getCurrentUserId } from '../../store/ducks/sessions';
import { loadUser } from '../../store/ducks/users';
import Bootstrap from '../../components/Bootstrap';

function mapStateToProps(state) {
  return {
    currentUserId: getCurrentUserId(state),
  };
}

const mapDispatchToProps = {
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap);
