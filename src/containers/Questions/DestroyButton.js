import { connect } from 'react-redux';
import {
  destroyQuestion,
  getDestroyingIds,
} from '../../store/ducks/questions';
import DestroyButton from '../../components/DestroyButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId, pending } = ownProps;

  return {
    onDestroy: () => dispatch(destroyQuestion(id, majorId, pending)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton);
