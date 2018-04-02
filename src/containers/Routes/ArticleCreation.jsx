import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCanCreateArticles } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, ownProps) {
  const params = { majorId: ownProps.match.params.majorId };

  return {
    restrictedCondition: getCanCreateArticles(state, params),
  };
}

const connectedComponent = connect(mapStateToProps)(Restricted);
export default withRouter(connectedComponent);
