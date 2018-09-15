import { connect } from 'react-redux';
import { toggleArticleApproval, getIsTogglingArticleApproval } from '../store/ducks/articles';
import ApprovalButton from '../components/ApprovalButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getIsTogglingArticleApproval(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, { id, baseId, approved }) {
  return {
    onClick: () => dispatch(toggleArticleApproval(id, !approved, baseId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalButton);
