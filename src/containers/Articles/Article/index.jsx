import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import {
  collection,
  loadArticle,
  getArticleEntity,
} from '../../../store/ducks/articles';
import { getIsFetching } from '../../../store/ducks/loading';
import WithLoadableResource from '../../../hoc/WithLoadableResource';
import Article from '../../../components/Articles/Article';
import ROUTES from '../../../routes';
import { articleShape, matchShape } from '../../../shapes';

function ArticleWrapper(props) {
  const { article, match: { params } } = props;

  return article && article.majorId && !params.majorId
    ? <Redirect to={ROUTES.ARTICLE(article.id, article.majorId)} />
    : <Article {...props} />;
}

ArticleWrapper.propTypes = {
  article: articleShape,
  match: matchShape.isRequired,
};

ArticleWrapper.defaultProps = {
  article: undefined,
};

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const article = getArticleEntity(state, params);

  return {
    loading: !article && getIsFetching(state, params),
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId } = ownProps.match.params;

  return {
    loadArticle: () => dispatch(loadArticle(id, majorId)),
  };
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadableResource('loadArticle', 'article')(ArticleWrapper));

export default withRouter(connectedComponent);
