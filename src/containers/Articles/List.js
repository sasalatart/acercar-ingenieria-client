import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  addQueryToCurrentUri,
  getPage,
} from '../../store/ducks/routes';
import { getHasAdminPrivileges } from '../../store/ducks/sessions';
import {
  loadArticles,
  getPagingFns,
} from '../../store/ducks/articles';
import ArticlesList from '../../components/Articles/List';

function mapStateToProps(state, ownProps) {
  const pagingFns = getPagingFns(ownProps.majorId);

  const defaultPage = getPage(state);
  const props = { majorId: ownProps.majorId, page: defaultPage };

  return {
    defaultPage,
    hasAdminPrivileges: getHasAdminPrivileges(state, props),
    pagination: pagingFns.getMeta(state, props),
    articles: pagingFns.getPagedEntities(state, props),
  };
}

const mapDispatchToProps = {
  loadArticles,
  addQueryToCurrentUri,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesList));
