import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getIsAdminOrMajorAdmin,
  getCurrentUserEntity,
} from '../../store/ducks/sessions';
import { getMajorIdFromProps } from '../../store/ducks/majors';
import {
  loadArticle,
  getArticleEntity,
  getArticleIdFromProps,
} from '../../store/ducks/articles';
import { getIsFetching } from '../../store/ducks/loading';
import DataPlaceholder from '../../components/DataPlaceholder';
import Restricted from '../../components/Routes/Restricted';
import { articlesCollection as collection } from '../../lib/collections';

class ArticleEdition extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadArticle: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadArticle();
  }

  render() {
    return this.props.loading
      ? <DataPlaceholder absolute />
      : <Restricted {...this.props} />;
  }
}

function mapStateToProps(state, ownProps) {
  const majorId = getMajorIdFromProps(ownProps);
  const articleId = getArticleIdFromProps(ownProps);
  const params = { majorId, collection, id: articleId };

  const currentUser = getCurrentUserEntity(state);
  const article = getArticleEntity(state, params);

  const adminOrMajorAdmin = getIsAdminOrMajorAdmin(state, params);
  const isAuthor = currentUser && article && currentUser.id === article.author.id;

  return {
    loading: !article && getIsFetching(state, params),
    restrictedCondition: adminOrMajorAdmin || isAuthor,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId } = ownProps.match.params;

  return {
    loadArticle: () => dispatch(loadArticle(id, majorId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleEdition);
