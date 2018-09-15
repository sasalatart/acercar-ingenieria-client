import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIsAdminOrMajorAdmin } from '../../store/ducks/sessions';
import { getMajorIdFromProps } from '../../store/ducks/majors';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, ownProps) {
  const unanswered = ownProps.match.params.unanswered || ownProps.unanswered;
  const majorId = getMajorIdFromProps(ownProps);

  return {
    restrictedCondition: !unanswered || getIsAdminOrMajorAdmin(state, { majorId }),
  };
}

export default withRouter(connect(mapStateToProps)(Restricted));
