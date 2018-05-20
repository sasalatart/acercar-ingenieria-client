import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { addQueryToCurrentUri } from '../../../store/ducks/routes';
import {
  loadArticles,
  resetPagination,
  getPagingFns,
} from '../../../store/ducks/articles';
import { getIsFetching } from '../../../store/ducks/loading';
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

  const params = { ...getCollectionParams(majorId), suffix, paged: true };
  const pagingFns = getPagingFns(params, true).selectors;

  const articles = pagingFns.getPagedEntities(state, params);

  return {
    majorId,
    suffix,
    loading: isEmpty(articles) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    articles,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, suffix } = processOwnProps(ownProps);

  return {
    loadArticles: ({ page, ...query }) => dispatch(loadArticles(page, majorId, suffix, query)),
    onTagClick: (text) => {
      dispatch(resetPagination({ baseResourceId: majorId, suffix }));
      dispatch(addQueryToCurrentUri({ categoryList: text }));
    },
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
export default injectIntl(connectedComponent);
