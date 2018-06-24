import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { goToArticles } from '../../../store/ducks/routes';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import {
  loadArticle,
  getArticleEntity,
  getArticleSummaryEntity,
} from '../../../store/ducks/articles';
import { getIsFetching } from '../../../store/ducks/loading';
import withAuthorization from '../../../hoc/withAuthorization';
import withLoadableResource from '../../../hoc/withLoadableResource';
import Article from '../../../components/Articles/Article';
import { articleShape, articleSummaryShape, matchShape } from '../../../shapes';
import routes from '../../../lib/routes';
import { getCollectionParams } from '../../../lib/articles';

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

function mapStateToProps(state, { match: { params: { id, majorId } } }) {
  const params = getCollectionParams(majorId, { id });
  const article = getArticleEntity(state, params) || getArticleSummaryEntity(state, params);

  return {
    isAuthor: !!(article && getCurrentUserId(state) === article.author.id),
    loading: !article && getIsFetching(state, params),
    article,
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id, majorId } } }) {
  return {
    loadArticle: () => dispatch(loadArticle(id, majorId)),
    onDestroy: () => dispatch(goToArticles(majorId)),
  };
}

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadArticle', 'article')(ArticleWrapper));

export default injectIntl(withRouter(withAuthorization(component)));
