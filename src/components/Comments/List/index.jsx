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
    currentPage: PropTypes.number.isRequired,
    answeringDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    loadComments: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    comments: [],
    answeringDisabled: false,
    disabled: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled !== this.props.disabled) {
      this.props.loadComments({ page: this.props.currentPage });
    }
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
