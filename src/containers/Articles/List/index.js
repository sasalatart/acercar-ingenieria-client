import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import {
  getCollectionParams,
  loadArticles,
  resetPagination,
  getPagingFns,
} from '../../../store/ducks/articles';
import { getIsFetching } from '../../../store/ducks/loading';
import ArticlesList from '../../../components/Articles/List';

function mapStateToProps(state, { majorId }) {
  const params = { ...getCollectionParams(majorId), paged: true };
  const pagingFns = getPagingFns(params, true).selectors;

  const articles = pagingFns.getPagedEntities(state, params);

  return {
    loading: isEmpty(articles) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    articles,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadArticles: ({ page, ...query }) => dispatch(loadArticles(page, ownProps.majorId, query)),
    onTagClick: (text) => {
      dispatch(resetPagination(ownProps.majorId));
      dispatch(addQueryToCurrentUri({ categoryList: text }));
    },
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
export default injectIntl(connectedComponent);
