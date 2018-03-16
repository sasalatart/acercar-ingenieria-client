import { connect } from 'react-redux';
import { getBaseResourceIdName } from '../../store/ducks/paginations';
import {
  loadComments,
  getPagingFns,
} from '../../store/ducks/comments';
import CommentsList from '../../components/Comments/List';

function mapStateToProps(state, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;

  const params = { [getBaseResourceIdName(baseResourceName)]: baseResourceId };
  const pagingFns = getPagingFns(baseResourceName);
  const comments = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: !comments || !comments.length,
    pagination: pagingFns.selectors.getMeta(state, params),
    comments,
  };
}

const mapDispatchToProps = {
  loadComments,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    loadComments: (page = 1) =>
      dispatchProps.loadComments(baseResourceName, baseResourceId, page),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CommentsList);
