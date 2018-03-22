import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
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
    this.props.loadFn(this.props.current);
  }

  componentWillReceiveProps(nextProps) {
    const pageChanged = nextProps.current !== this.props.current;
    const searchChanged = nextProps.search !== this.props.search;

    if (pageChanged || searchChanged) {
      this.props.loadFn(nextProps.current);
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
