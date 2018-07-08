import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCanCreateArticles } from '../../store/ducks/sessions';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, { match: { params } }) {
  return {
    restrictedCondition: getCanCreateArticles(state, params),
  };
}

export default withRouter(connect(mapStateToProps)(Restricted));
