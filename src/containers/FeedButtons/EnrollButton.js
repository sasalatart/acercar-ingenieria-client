import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { enroll, unenroll } from '../../store/ducks/enrollments';
import {
  getIsCreating,
  getIsDestroying,
} from '../../store/ducks/loading';
import WithAuthorization from '../../hoc/WithAuthorization';
import EnrollButton from '../../components/FeedButtons/EnrollButton';
import { enrollmentsCollection as collection } from '../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, collection };

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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(EnrollButton);
export default injectIntl(WithAuthorization(connectedComponent));
