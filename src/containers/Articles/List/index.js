import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadArticles,
  getPagingFns,
} from '../../../store/ducks/articles';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ArticlesList from '../../../components/Articles/List';

function mapStateToProps(state, ownProps) {
  const params = { majorId: ownProps.majorId };
  const pagingFns = getPagingFns(ownProps.majorId);

  const articles = pagingFns.getPagedEntities(state, params);

  return {
    loading: !articles || !articles.size,
    pagination: pagingFns.getMeta(state, params),
    articles,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadArticles: (page = 1) => dispatch(loadArticles(page, ownProps.majorId)),
  };
}

export default injectIntl(WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesList)));
