import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Comment from './Item/Comment';
import PaginationControls from '../../../containers/Pagination';
import { paginationShape, commentShape } from '../../../shapes';

export default class CommentsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    comments: PropTypes.arrayOf(commentShape),
    answeringDisabled: PropTypes.bool,
    loadComments: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    comments: [],
    answeringDisabled: false,
  }

  renderComments() {
    const { comments, answeringDisabled } = this.props;
    return comments.map(comment =>
      <Comment key={comment.id} comment={comment} answeringDisabled={answeringDisabled} />);
  }

  render() {
    const {
      loading, comments, pagination, loadComments,
    } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(comments)}
        render={() => this.renderComments()}
        loadFn={loadComments}
      />
    );
  }
}
