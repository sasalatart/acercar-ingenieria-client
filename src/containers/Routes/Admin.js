import { connect } from 'react-redux';
import { getHasAdminPrivileges } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state) {
  return {
    restrictedCondition: getHasAdminPrivileges(state),
  };
}

export default connect(mapStateToProps)(Restricted);
