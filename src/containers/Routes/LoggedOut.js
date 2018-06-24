import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state) {
  return {
    restrictedCondition: !getIsLoggedIn(state),
  };
}

export default connect(mapStateToProps)(Restricted);
