import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  destroyUser,
  getDestroyingIds,
} from '../../store/ducks/users';
import DestroyButton from '../../components/DestroyButton/Important';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps;

  return {
    onDestroy: () => dispatch(destroyUser(id)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton));
