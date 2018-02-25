import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToArticleEdit } from '../../store/ducks/routes';
import {
  getHasAdminPrivileges,
  getCurrentUserEntity,
} from '../../store/ducks/sessions';
import ArticleActionBar from '../../components/Article/ActionBar';

function mapStateToProps(state, ownProps) {
  const { article } = ownProps;
  const currentUser = getCurrentUserEntity(state);

  return {
    hasAdminPrivileges: getHasAdminPrivileges(state, { majorId: article.majorId }),
    isAuthor: !!(currentUser && article && currentUser.id === article.author.id),
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId } = ownProps.article;

  return {
    goToArticleEdit: () => dispatch(goToArticleEdit(id, majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleActionBar));
