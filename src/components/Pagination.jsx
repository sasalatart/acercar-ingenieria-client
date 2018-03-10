import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import noop from 'lodash/noop';
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
    search: PropTypes.string,
    current: PropTypes.number,
    pagination: paginationShape,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    loadFn: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    onPageChange: PropTypes.func,
  }

  static defaultProps = {
    search: '',
    current: 1,
    pagination: undefined,
    onPageChange: noop,
  }

  componentDidMount() {
    this.props.loadFn(this.props.current);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      this.props.loadFn(nextProps.current);
    }
  }

  handlePageChange = (page) => {
    this.props.addQueryToCurrentUri({ page });
    this.props.onPageChange();
  }

  renderPaginationTag() {
    const { current, pagination: { perPage, totalRecords } } = this.props;

    return (
      <div style={styles.paginationWrapper}>
        <Pagination
          current={current}
          pageSize={perPage}
          total={totalRecords}
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
