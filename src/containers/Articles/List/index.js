import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import {
  getCurrentUserId,
  getCanCreateArticles,
} from '../../../store/ducks/sessions';
import {
  loadMajors,
  getMajorOptions,
} from '../../../store/ducks/majors';
import {
  loadCategories,
  getCategoryOptions,
} from '../../../store/ducks/categories';
import {
  loadArticles,
  resetPagination,
  getPagingFns,
} from '../../../store/ducks/articles';
import { getIsFetching } from '../../../store/ducks/loading';
import withAuthorization from '../../../hoc/withAuthorization';
import ArticlesList from '../../../components/Articles/List';
import { getSuffix, getCollectionParams } from '../../../lib/articles';

function processOwnProps(ownProps) {
  const { majorId } = ownProps.match.params;

  return {
    majorId: majorId && +majorId,
    suffix: getSuffix(ownProps.mine, ownProps.pending),
  };
}

function mapStateToProps(state, ownProps) {
  const { majorId, suffix } = processOwnProps(ownProps);

  const params = { ...getCollectionParams(majorId, { suffix }), paged: true, majorId };
  const pagingFns = getPagingFns(params, true).selectors;

  const articleSummaries = pagingFns.getPagedEntities(state, params);

  return {
    currentUserId: getCurrentUserId(state),
    majorId,
    suffix,
    loading: isEmpty(articleSummaries) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    articleSummaries,
    majorOptions: getMajorOptions(state),
    categoryOptions: getCategoryOptions(state),
    canCreateArticles: getCanCreateArticles(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, suffix } = processOwnProps(ownProps);

  return {
    loadArticles: ({ page, ...query }) => dispatch(loadArticles(page, majorId, suffix, query)),
    loadMajors: () => dispatch(loadMajors()),
    loadCategories: () => dispatch(loadCategories()),
    resetPagination: () => dispatch(resetPagination({ baseResourceId: majorId, suffix })),
    onTagClick: (text) => {
      dispatch(resetPagination({ baseResourceId: majorId, suffix }));
      dispatch(addQueryToCurrentUri({ categoryList: text }));
    },
  };
}

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(ArticlesList));
