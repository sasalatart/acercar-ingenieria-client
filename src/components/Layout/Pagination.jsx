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
    load: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    search: '',
  }

  componentDidMount() {
    this.props.load({ page: this.props.paginationInfo.page });
  }

  componentDidUpdate(prevProps) {
    const { paginationInfo, search, load } = this.props;
    const pageChanged = prevProps.paginationInfo.page !== paginationInfo.page;
    const searchChanged = prevProps.search !== search;

    if (pageChanged || searchChanged) {
      const query = URI.parseQuery(search);
      load({ ...query, page: query.page || 1 });
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

  render() {
    const { loading, noData, children } = this.props;

    return (
      <Fragment>
        {this.renderPaginationTag()}
        {loading || noData
          ? <DataPlaceholder noData={noData} />
          : children
        }
        {this.renderPaginationTag()}
      </Fragment>
    );
  }
}

export default Radium(PaginationControls);
