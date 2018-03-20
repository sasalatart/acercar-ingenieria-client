import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  getCollectionParams,
  loadArticles,
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
    loadArticles: (page = 1) => dispatch(loadArticles(page, ownProps.majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesList));
