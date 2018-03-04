import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getHasAdminPrivileges } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, ownProps) {
  const { majorId, pending } = ownProps.match.params;
  const params = { majorId: +majorId };

  return {
    restrictedCondition: !pending || getHasAdminPrivileges(state, params),
  };
}

export default withRouter(connect(mapStateToProps)(Restricted));
