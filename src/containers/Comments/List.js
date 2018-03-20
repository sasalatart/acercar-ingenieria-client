import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadComments,
  getPagingFns,
} from '../../store/ducks/comments';
import { getIsFetching } from '../../store/ducks/loading';
import CommentsList from '../../components/Comments/List';

function mapStateToProps(state, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;

  const params = {
    collection, baseResourceName, baseResourceId, paged: true,
  };

  const pagingFns = getPagingFns(baseResourceName);
  const comments = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: isEmpty(comments) && getIsFetching(state, params),
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
