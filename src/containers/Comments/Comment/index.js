import { connect } from 'react-redux';
import { goToLanding } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { loadComment, getCommentEntity, getIsLoadingComment } from '../../../store/ducks/comments';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withLoadableResource from '../../../hoc/withLoadableResource';
import Comment from '../../../components/Comments/Comment';

function mapStateToProps(state, { match: { params } }) {
  const comment = getCommentEntity(state, params);

  return {
    ...getPlaceholderFlags(getIsLoadingComment(state, params), comment),
    isAuthor: !!(comment && getCurrentUserId(state) === comment.author.id),
    comment,
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id } } }) {
  return {
    loadComment: () => dispatch(loadComment(id)),
    onDestroy: () => dispatch(goToLanding()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadComment', 'comment')(Comment));
