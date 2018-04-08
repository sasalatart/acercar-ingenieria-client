import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  suffix,
  enroll,
  unenroll,
} from '../store/ducks/enrollments';
import {
  getIsCreating,
  getIsDestroying,
} from '../store/ducks/loading';
import WithAuthorization from '../hoc/WithAuthorization';
import EnrollButton from '../components/EnrollButton';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, suffix };

  return {
    loading: getIsCreating(state, params) || getIsDestroying(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { collection, id, enrolledByCurrentUser } = ownProps;

  const onClickFn = enrolledByCurrentUser ? unenroll : enroll;
  return {
    onClick: () => dispatch(onClickFn(collection, id)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(EnrollButton);
export default injectIntl(WithAuthorization(connectedComponent));
