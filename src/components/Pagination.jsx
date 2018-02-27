import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import get from 'lodash/get';
import Spinner from './Spinner';
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
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    render: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
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

  renderContent() {
    return this.props.loading ? <Spinner /> : this.props.render();
  }

  render() {
    if (!this.props.pagination) {
      return this.renderContent();
    }

    return (
      <div>
        {this.renderPaginationTag()}
        {this.renderContent()}
        {this.renderPaginationTag()}
      </div>
    );
  }
}
