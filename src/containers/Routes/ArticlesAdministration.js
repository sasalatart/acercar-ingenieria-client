import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WithAuthorization from '../../hoc/WithAuthorization';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, { loggedIn, adminOrMajorAdmin, match: { params } }) {
  return {
    restrictedCondition: loggedIn && (!params.pending || adminOrMajorAdmin),
  };
}

const connectedComponent = connect(mapStateToProps)(Restricted);
export default withRouter(WithAuthorization(connectedComponent));
