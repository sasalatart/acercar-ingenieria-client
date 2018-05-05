import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadComments,
  getPagingFns,
} from '../../../store/ducks/comments';
import { getIsFetching } from '../../../store/ducks/loading';
import CommentsList from '../../../components/Comments/List';

function mapStateToProps(state, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;

  const params = {
    collection, baseResourceName, baseResourceId, paged: true,
  };

  const pagingFns = getPagingFns(params, true).selectors;
  const comments = pagingFns.getPagedEntities(state, params);

  return {
    loading: isEmpty(comments) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    comments,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { baseResourceName, baseResourceId } = ownProps;

  return {
    loadComments: ({ page }) =>
      dispatch(loadComments(baseResourceName, baseResourceId, page)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(CommentsList);
export default injectIntl(connectedComponent);
