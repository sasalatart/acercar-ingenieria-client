import { connect } from 'react-redux';
import { destroyArticle, getDestroyingIds } from '../../store/ducks/articles';
import DestroyButton from '../../components/DestroyButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId, page } = ownProps;

  return {
    onDestroy: () => dispatch(destroyArticle(id, majorId, page)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton);
