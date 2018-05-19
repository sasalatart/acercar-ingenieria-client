import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { parseBaseResource } from '../../../routes';
import { loadComment, getCommentEntity } from '../../../store/ducks/comments';
import { getIsFetching } from '../../../store/ducks/loading';
import WithLoadableResource from '../../../hoc/WithLoadableResource';
import Comment from '../../../components/Comments/Comment';
import { commentsCollection as collection } from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const comment = getCommentEntity(state, params);

  return {
    loading: !comment && getIsFetching(state, params),
    comment,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { params } = ownProps.match;
  const { baseResourceName, baseResourceId } = parseBaseResource(params) || {};

  return {
    loadComment: () => dispatch(loadComment(params.id, baseResourceName, baseResourceId)),
  };
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadableResource('loadComment', 'comment')(Comment));
export default injectIntl(connectedComponent);
