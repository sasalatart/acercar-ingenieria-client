import { connect } from 'react-redux';
import {
  destroyDiscussion,
  getDestroyingIds,
} from '../../store/ducks/discussions';
import DestroyButton from '../../components/DestroyButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDestroy: () => dispatch(destroyDiscussion(ownProps.id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton);
