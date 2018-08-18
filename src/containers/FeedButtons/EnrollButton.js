import { connect } from 'react-redux';
import { enroll, unenroll } from '../../store/ducks/enrollments';
import {
  getIsCreating,
  getIsDestroying,
} from '../../store/ducks/loading';
import withAuthorization from '../../hoc/withAuthorization';
import EnrollButton from '../../components/FeedButtons/EnrollButton';
import collections from '../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, collection: collections.enrollments };

  return {
    loading: getIsCreating(state, params) || getIsDestroying(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { baseResourceName, baseResourceId, enrolledByCurrentUser } = ownProps;

  const onClickFn = enrolledByCurrentUser ? unenroll : enroll;
  return {
    onClick: () => dispatch(onClickFn(baseResourceName, baseResourceId)),
  };
}

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(EnrollButton));
