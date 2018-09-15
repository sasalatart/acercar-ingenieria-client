import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { goToArticles } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadArticle,
  getArticleEntity,
  getArticleSummaryEntity,
  getIsLoadingArticle,
} from '../../../store/ducks/articles';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withAuthorization from '../../../hoc/withAuthorization';
import withLoadableResource from '../../../hoc/withLoadableResource';
import Article from '../../../components/Articles/Article';
import { articleShape, articleSummaryShape, matchShape } from '../../../shapes';
import routes from '../../../lib/routes';

function ArticleWrapper(props) {
  const { article, match: { params } } = props;

  return article && article.majorSummary && !params.majorId
    ? <Redirect to={routes.article(article.id, article.majorSummary.id)} />
    : <Article {...props} />;
}

ArticleWrapper.propTypes = {
  article: PropTypes.oneOfType([
    articleShape,
    articleSummaryShape,
  ]),
  match: matchShape.isRequired,
};

ArticleWrapper.defaultProps = {
  article: undefined,
};

function mapStateToProps(state, { match: { params } }) {
  const article = getArticleEntity(state, params) || getArticleSummaryEntity(state, params);

  return {
    ...getPlaceholderFlags(getIsLoadingArticle(state, params), article),
    isAuthor: !!(article && getCurrentUserId(state) === article.author.id),
    article,
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id, majorId } } }) {
  return {
    loadArticle: () => dispatch(loadArticle(id)),
    onDestroy: () => dispatch(goToArticles(majorId)),
  };
}

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadArticle', 'article')(ArticleWrapper));

export default withRouter(withAuthorization(component));
