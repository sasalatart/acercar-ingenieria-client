import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  goToArticles,
  goToArticleEdit,
} from '../../store/ducks/routes';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import WithAuthorization from '../../hoc/WithAuthorization';
import ArticleActionBar from '../../components/Article/ActionBar';

function mapStateToProps(state, ownProps) {
  const { article } = ownProps;
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: !!(currentUser && article && currentUser.id === article.author.id),
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId } = ownProps.article;

  return {
    goToArticleEdit: () => dispatch(goToArticleEdit(id, majorId)),
    onDestroy: () => dispatch(goToArticles(majorId)),
  };
}

export default injectIntl(WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleActionBar)));
