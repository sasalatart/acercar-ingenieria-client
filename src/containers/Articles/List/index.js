import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import { getCurrentUserId, getCanCreateArticles } from '../../../store/ducks/sessions';
import { loadMajors, getMajorOptions } from '../../../store/ducks/majors';
import { loadCategories, getCategoryOptions } from '../../../store/ducks/categories';
import {
  loadArticles,
  resetPagination,
  getPaginationData,
  getIsLoadingArticles,
} from '../../../store/ducks/articles';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withAuthorization from '../../../hoc/withAuthorization';
import ArticlesList from '../../../components/Articles/List';
import { getSuffix } from '../../../lib/articles';

function processOwnProps(ownProps) {
  const { majorId } = ownProps.match.params;
  return {
    majorId: majorId && +majorId,
    suffix: getSuffix(ownProps.mine, ownProps.unapproved),
  };
}

function mapStateToProps(state, ownProps) {
  const { majorId, suffix } = processOwnProps(ownProps);
  const params = { majorId, suffix, baseId: majorId };
  const { paginationInfo, pagedEntities: articleSummaries } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoadingArticles(state, params), articleSummaries),
    currentUserId: getCurrentUserId(state),
    majorId,
    suffix,
    paginationInfo,
    articleSummaries,
    majorOptions: getMajorOptions(state),
    categoryOptions: getCategoryOptions(state),
    canCreateArticles: getCanCreateArticles(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, suffix } = processOwnProps(ownProps);

  return {
    ...bindActionCreators({
      loadMajors,
      loadCategories,
      resetPagination,
    }, dispatch),
    loadArticles: query => dispatch(loadArticles({ baseId: majorId, suffix, query })),
    onTagClick: (text) => {
      dispatch(resetPagination());
      dispatch(addQueryToCurrentUri({ categoryList: text }));
    },
  };
}

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(ArticlesList));
