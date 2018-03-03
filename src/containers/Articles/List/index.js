import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getPage } from '../../../store/ducks/routes';
import { getHasAdminPrivileges } from '../../../store/ducks/sessions';
import {
  loadArticles,
  getPagingFns,
} from '../../../store/ducks/articles';
import ArticlesList from '../../../components/Articles/List';

function mapStateToProps(state, ownProps) {
  const params = { majorId: ownProps.majorId, page: getPage(state) };
  const pagingFns = getPagingFns(ownProps.majorId);

  const articles = pagingFns.getPagedEntities(state, params);

  return {
    hasAdminPrivileges: getHasAdminPrivileges(state, params),
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

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesList));
