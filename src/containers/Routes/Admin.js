import { connect } from 'react-redux';
import { getIsAdmin } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state) {
  return {
    restrictedCondition: getIsAdmin(state),
  };
}

export default connect(mapStateToProps)(Restricted);
