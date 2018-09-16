import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../containers/Layout/Pagination';
import Comment from './Item/Comment';
import { paginationInfoShape, commentShape } from '../../../shapes';

export default class CommentsList extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
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

  render() {
    const {
      adminOrMajorAdmin,
      currentUserId,
      loading,
      noData,
      comments,
      paginationInfo,
      answeringDisabled,
      loadComments: load,
    } = this.props;

    return (
      <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            adminOrMajorAdmin={adminOrMajorAdmin}
            currentUserId={currentUserId}
            comment={comment}
            answeringDisabled={answeringDisabled}
          />
        ))}
      </Pagination>
    );
  }
}
