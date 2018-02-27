import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Set } from 'immutable';
import CommentBox from './CommentBox';
import PaginationControls from '../Pagination';
import { paginationShape, commentShape } from '../../shapes';

export default class Comments extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    comments: ImmutablePropTypes.setOf(commentShape),
    loadComments: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    comments: new Set(),
  }

  componentDidMount() {
    this.props.loadComments();
  }

  handlePageChange = (page) => {
    this.props.addQueryToCurrentUri({ page });
    this.props.loadComments(page);
  }

  renderComments = () =>
    this.props.comments.map(comment => <CommentBox key={comment.id} comment={comment} />);

  render() {
    const { loading, pagination } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        onPageChange={this.handlePageChange}
        render={this.renderComments}
      />
    );
  }
}
