import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from '../../containers/Comments/Comment';
import PaginationControls from '../../containers/Pagination';
import { paginationShape, commentShape } from '../../shapes';

export default class CommentsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    comments: PropTypes.arrayOf(commentShape),
    loadComments: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    comments: [],
  }

  renderComments = () =>
    this.props.comments.map(comment => <Comment key={comment.id} comment={comment} />);

  render() {
    const { loading, pagination, loadComments } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        render={this.renderComments}
        loadFn={loadComments}
      />
    );
  }
}
