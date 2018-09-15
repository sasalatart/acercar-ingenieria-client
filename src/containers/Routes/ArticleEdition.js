import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUserId } from '../../store/ducks/sessions';
import {
  loadArticle,
  getArticleEntity,
  getArticleIdFromProps,
  getIsLoadingArticle,
} from '../../store/ducks/articles';
import { getPlaceholderFlags } from '../../store/ducks/shared';
import withAuthorization from '../../hoc/withAuthorization';
import withLoadableResource from '../../hoc/withLoadableResource';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, ownProps) {
  const params = { id: getArticleIdFromProps(ownProps) };
  const article = getArticleEntity(state, params);
  const isAuthor = article && getCurrentUserId(state) === article.author.id;
  return {
    ...getPlaceholderFlags(getIsLoadingArticle(state, params), article),
    restrictedCondition: ownProps.adminOrMajorAdmin || isAuthor,
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const id = getArticleIdFromProps(ownProps);
  return {
    loadArticle: () => dispatch(loadArticle(id)),
  };
}

export default compose(
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps),
  withLoadableResource('loadArticle', 'article'),
)(Restricted);
