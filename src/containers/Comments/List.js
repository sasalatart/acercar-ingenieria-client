import { connect } from 'react-redux';
import { getPage } from '../../store/ducks/routes';
import { getBaseResourceIdName } from '../../store/ducks/paginations';
import {
  loadComments,
  getPagingFns,
} from '../../store/ducks/comments';
import CommentsList from '../../components/Comments/List';

function mapStateToProps(state, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;
  const page = getPage(state);

  const params = { [getBaseResourceIdName(baseResourceName)]: baseResourceId, page };
  const pagingFns = getPagingFns(baseResourceName);
  const comments = pagingFns.getPagedEntities(state, params);

  return {
    loading: !comments || !comments.size,
    pagination: pagingFns.getMeta(state, params),
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
