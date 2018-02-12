import { connect } from 'react-redux';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state) {
  return {
    restrictedCondition: !!getCurrentUserEntity(state),
  };
}

export default connect(mapStateToProps)(Restricted);
