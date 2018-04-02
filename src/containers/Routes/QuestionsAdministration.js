import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIsAdminOrMajorAdmin } from '../../store/ducks/sessions';
import { getMajorIdFromProps } from '../../store/ducks/majors';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, ownProps) {
  const pending = ownProps.match.params.pending || ownProps.pending;
  const majorId = getMajorIdFromProps(ownProps);

  return {
    restrictedCondition: !pending || getIsAdminOrMajorAdmin(state, { majorId }),
  };
}

export default withRouter(connect(mapStateToProps)(Restricted));
