import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { destroyComment, getDestroyingIds } from '../../store/ducks/comments';
import DestroyButton from '../../components/DestroyButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const collectionIds = pick(ownProps, ['majorId', 'articleId', 'discussionId']);

  return {
    onDestroy: () => dispatch(destroyComment(ownProps.id, collectionIds)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton);
