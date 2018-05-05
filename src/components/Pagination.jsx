import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import URI from 'urijs';
import DataPlaceholder from './DataPlaceholder';
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
    noData: PropTypes.bool.isRequired,
    search: PropTypes.string,
    current: PropTypes.number,
    pagination: paginationShape,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    loadFn: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  }

  static defaultProps = {
    search: '',
    current: 1,
    pagination: undefined,
  }

  componentDidMount() {
    this.props.loadFn({ page: this.props.current });
  }

  componentDidUpdate(prevProps) {
    const { current, search, loadFn } = this.props;
    const pageChanged = prevProps.current !== current;
    const searchChanged = prevProps.search !== search;

    if (pageChanged || searchChanged) {
      loadFn({ page: current, ...URI.parseQuery(search) });
    }
  }

  handlePageChange = (page) => {
    this.props.addQueryToCurrentUri({ page });
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
    const { loading, noData, render } = this.props;
    return (loading || noData) ? <DataPlaceholder noData={noData} /> : render();
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
