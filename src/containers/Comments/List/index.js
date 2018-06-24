import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { getPage } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { loadComments, getPagingFns } from '../../../store/ducks/comments';
import { getIsFetching } from '../../../store/ducks/loading';
import withAuthorization from '../../../hoc/withAuthorization';
import CommentsList from '../../../components/Comments/List';
import collections from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, collection: collections.comments, paged: true };

  const pagingFns = getPagingFns(params, true).selectors;
  const comments = pagingFns.getPagedEntities(state, params);

  return {
    currentUserId: getCurrentUserId(state),
    loading: isEmpty(comments) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    comments,
    currentPage: getPage(state) || 1,
  };
}

function mapDispatchToProps(dispatch, { baseResourceName, baseResourceId }) {
  return {
    loadComments: ({ page }) =>
      dispatch(loadComments(baseResourceName, baseResourceId, page)),
  };
}

const component = connect(mapStateToProps, mapDispatchToProps)(CommentsList);
export default injectIntl(withAuthorization(component));
