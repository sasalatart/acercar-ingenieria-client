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

function mapStateToProps(state, ownProps) {
  const params = { ...getCollectionParams(ownProps.majorId), paged: true };
  const pagingFns = getPagingFns(ownProps.majorId);

  const articles = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: isEmpty(articles) && getIsFetching(state, params),
    pagination: pagingFns.selectors.getMeta(state, params),
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

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesList));
