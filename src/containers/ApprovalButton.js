import { connect } from 'react-redux';
import { articleApproval } from '../store/ducks/articles';
import { getIsUpdating } from '../store/ducks/loading';
import ApprovalButton from '../components/ApprovalButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getIsUpdating(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, { id, baseResourceId, approved }) {
  return {
    onClick: () => dispatch(articleApproval(id, baseResourceId, !approved)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalButton);
