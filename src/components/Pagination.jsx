import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import get from 'lodash/get';
import { paginationShape } from '../shapes';

const styles = {
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0',
  },
};

export default class PaginationControls extends Component {
  static propTypes = {
    pagination: paginationShape,
    onPageChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
  }

  state = { page: get(this.props.pagination, 'page', 1) };

  handlePageChange = (page) => {
    this.setState({ page });
    this.props.onPageChange(page);
  }

  renderPaginationTag() {
    const { pagination } = this.props;

    return (
      <div style={styles.paginationWrapper}>
        <Pagination
          current={this.state.page}
          pageSize={pagination.perPage}
          total={pagination.totalRecords}
          onChange={this.handlePageChange}
          hideOnSinglePage
        />
      </div>
    );
  }

  render() {
    const { pagination, children } = this.props;

    if (!pagination) {
      return children;
    }

    return (
      <div>
        {this.renderPaginationTag()}
        {children}
        {this.renderPaginationTag()}
      </div>
    );
  }
}
