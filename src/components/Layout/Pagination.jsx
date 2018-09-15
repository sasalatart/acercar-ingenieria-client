import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Pagination } from 'antd';
import URI from 'urijs';
import DataPlaceholder from './DataPlaceholder';
import { paginationInfoShape } from '../../shapes';

const styles = {
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0',
  },
};

class PaginationControls extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    search: PropTypes.string,
    paginationInfo: paginationInfoShape.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    loadFn: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  }

  static defaultProps = {
    search: '',
  }

  componentDidMount() {
    this.props.loadFn({ page: this.props.paginationInfo.page });
  }

  componentDidUpdate(prevProps) {
    const { paginationInfo, search, loadFn } = this.props;
    const pageChanged = prevProps.paginationInfo.page !== paginationInfo.page;
    const searchChanged = prevProps.search !== search;

    if (pageChanged || searchChanged) {
      const query = URI.parseQuery(search);
      loadFn({ ...query, page: query.page || 1 });
    }
  }

  handlePageChange = (page) => {
    this.props.addQueryToCurrentUri({ page });
  }

  renderPaginationTag() {
    const { perPage, totalRecords, page } = this.props.paginationInfo;
    return (
      <div style={styles.paginationWrapper}>
        <Pagination
          current={page}
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
    return (
      <Fragment>
        {this.renderPaginationTag()}
        {this.renderContent()}
        {this.renderPaginationTag()}
      </Fragment>
    );
  }
}

export default Radium(PaginationControls);
