import { connect } from 'react-redux';
import { goToLanding } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { loadComment, getCommentEntity } from '../../../store/ducks/comments';
import { getIsFetching } from '../../../store/ducks/loading';
import withLoadableResource from '../../../hoc/withLoadableResource';
import Comment from '../../../components/Comments/Comment';
import collections, { parseBaseResource } from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection: collections.comments };
  const comment = getCommentEntity(state, params);

  return {
    isAuthor: !!(comment && getCurrentUserId(state) === comment.author.id),
    loading: !comment && getIsFetching(state, params),
    comment,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { params } = ownProps.match;
  const { baseResourceName, baseResourceId } = parseBaseResource(params) || {};

  return {
    loadComment: () => dispatch(loadComment(params.id, baseResourceName, baseResourceId)),
    onDestroy: () => dispatch(goToLanding()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadComment', 'comment')(Comment));
