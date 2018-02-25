import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getHasAdminPrivileges,
  getCurrentUserEntity,
} from '../../store/ducks/sessions';
import {
  loadArticle,
  getArticleEntity,
} from '../../store/ducks/articles';
import Spinner from '../../components/Spinner';
import Restricted from '../../components/Routes/Restricted';

class ArticlePrivileges extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadArticle: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadArticle();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return <Restricted {...this.props} />;
  }
}

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  const currentUser = getCurrentUserEntity(state);
  const article = getArticleEntity(state, params);

  const hasAdminPrivileges = getHasAdminPrivileges(state, params);
  const isAuthor = currentUser && article && currentUser.id === article.author.id;

  return {
    loading: !article,
    restrictedCondition: hasAdminPrivileges || isAuthor,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, articleId } = ownProps.match.params;

  return {
    loadArticle: () => dispatch(loadArticle(articleId, majorId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlePrivileges);
