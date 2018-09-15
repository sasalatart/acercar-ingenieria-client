import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Layout/Pagination';
import Comment from './Item/Comment';
import { paginationInfoShape, commentShape } from '../../../shapes';

export default class CommentsList extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    comments: PropTypes.arrayOf(commentShape).isRequired,
    answeringDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    loadComments: PropTypes.func.isRequired,
  }

  static defaultProps = {
    answeringDisabled: false,
    disabled: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled !== this.props.disabled) {
      this.props.loadComments({ page: this.props.paginationInfo.page });
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
      paginationInfo,
      loadComments,
    } = this.props;

    return (
      <PaginationControls
        paginationInfo={paginationInfo}
        loading={loading}
        noData={!loading && isEmpty(comments)}
        render={() => this.renderComments()}
        loadFn={loadComments}
      />
    );
  }
}
