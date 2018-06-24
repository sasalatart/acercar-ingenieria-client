import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuthorization from '../../hoc/withAuthorization';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, { loggedIn, adminOrMajorAdmin, match: { params } }) {
  return {
    restrictedCondition: loggedIn && (!params.pending || adminOrMajorAdmin),
  };
}

const component = connect(mapStateToProps)(Restricted);
export default withRouter(withAuthorization(component));
