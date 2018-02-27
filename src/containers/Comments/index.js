import { connect } from 'react-redux';
import {
  addQueryToCurrentUri,
  getPage,
} from '../../store/ducks/routes';
import {
  loadComments,
  getPagingFns,
} from '../../store/ducks/comments';
import Comments from '../../components/Comments';

function mapStateToProps(state, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;
  const page = getPage(state);

  const params = { [`${baseResourceName.slice(0, -1)}Id`]: baseResourceId, page };
  const pagingFns = getPagingFns(params);
  const comments = pagingFns.getPagedEntities(state, params);

  return {
    loading: !comments || !comments.size,
    pagination: pagingFns.getMeta(state, params),
    comments,
  };
}

const mapDispatchToProps = {
  loadComments,
  addQueryToCurrentUri,
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
)(Comments);
