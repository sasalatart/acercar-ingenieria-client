import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Layout/Pagination';
import Comment from './Item/Comment';
import { paginationShape, commentShape } from '../../../shapes';

export default class CommentsList extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired,
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
    const {
      adminOrMajorAdmin, currentUserId, comments, answeringDisabled,
    } = this.props;

    return comments.map(comment => (
      <Comment
        key={comment.id}
        adminOrMajorAdmin={adminOrMajorAdmin}
        currentUserId={currentUserId}
        comment={comment}
        answeringDisabled={answeringDisabled}
      />
    ));
  }

  render() {
    const {
      loading,
      comments,
      pagination,
      loadComments,
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
