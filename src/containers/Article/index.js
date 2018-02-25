import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadArticle,
  getArticleEntity,
} from '../../store/ducks/articles';
import Article from '../../components/Article/index';

function mapStateToProps(state, ownProps) {
  const { articleId } = ownProps.match.params;
  const article = getArticleEntity(state, ownProps.match.params);

  return {
    loading: !!articleId && !article,
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, articleId } = ownProps.match.params;

  return {
    loadArticle: () => dispatch(loadArticle(articleId, majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article));
