import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { loadComments, getPaginationData, getIsLoadingComments } from '../../../store/ducks/comments';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withAuthorization from '../../../hoc/withAuthorization';
import CommentsList from '../../../components/Comments/List';

function mapStateToProps(state, ownProps) {
  const { paginationInfo, pagedEntities: comments } = getPaginationData(state, ownProps);
  const params = { ...ownProps, ...paginationInfo };
  return {
    currentUserId: getCurrentUserId(state),
    ...getPlaceholderFlags(getIsLoadingComments(state, params), comments),
    paginationInfo,
    comments,
  };
}

function mapDispatchToProps(dispatch, { baseCollection, baseId }) {
  return {
    loadComments: query => dispatch(loadComments({ baseCollection, baseId, query })),
  };
}

export default compose(
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps),
)(CommentsList);
