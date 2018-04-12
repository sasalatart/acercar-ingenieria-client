import { connect } from 'react-redux';
import { goToLanding } from '../../../store/ducks/routes';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../components/Comments/Comment/ActionBar';

const mapDispatchToProps = {
  onDestroy: goToLanding,
};

const connectedComponent = connect(null, mapDispatchToProps)(ActionBar);
export default WithAuthorization(connectedComponent);
