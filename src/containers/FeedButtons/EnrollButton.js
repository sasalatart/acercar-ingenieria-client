import { connect } from 'react-redux';
import { enroll, unenroll, getIsTogglingEnrollment } from '../../store/ducks/enrollments';
import withAuthorization from '../../hoc/withAuthorization';
import EnrollButton from '../../components/FeedButtons/EnrollButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getIsTogglingEnrollment(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, { baseCollection, baseId, enrolledByCurrentUser }) {
  const onClickFn = enrolledByCurrentUser ? unenroll : enroll;
  return {
    onClick: () => dispatch(onClickFn(baseCollection, baseId)),
  };
}

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(EnrollButton));
