import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuthorization from '../../hoc/withAuthorization';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, { loggedIn, adminOrMajorAdmin, match: { params } }) {
  return {
    restrictedCondition: loggedIn && (!params.unapproved || adminOrMajorAdmin),
  };
}

export default compose(
  withRouter,
  withAuthorization,
  connect(mapStateToProps),
)(Restricted);
