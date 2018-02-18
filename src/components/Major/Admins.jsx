import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Pagination } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ProfileCard from '../Profile/Card';
import Spinner from '../Spinner';
import { paginationShape, userShape } from '../../shapes';

const styles = {
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  adminCard: {
    margin: '15px 5px',
  },
};

class MajorAdmins extends Component {
  static propTypes = {
    majorId: PropTypes.number.isRequired,
    pagination: paginationShape,
    majorAdmins: PropTypes.arrayOf(userShape),
    loadMajorAdmins: PropTypes.func.isRequired,
    goToUser: PropTypes.func.isRequired,
    addQueryToMajorPath: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorAdmins: undefined,
  }

  componentWillMount() {
    const { majorId, pagination, loadMajorAdmins } = this.props;
    loadMajorAdmins(majorId, pagination && pagination.page);
  }

  onPageChange = (page) => {
    const { majorId, loadMajorAdmins, addQueryToMajorPath } = this.props;
    addQueryToMajorPath(majorId, { page });
    loadMajorAdmins(majorId, page);
  }

  renderPaginationControls() {
    const { pagination } = this.props;

    if (!pagination) {
      return null;
    }

    return (
      <div style={styles.paginationWrapper}>
        <Pagination
          current={pagination.page}
          pageSize={pagination.perPage}
          total={pagination.totalRecords}
          onChange={this.onPageChange}
          hideOnSinglePage
        />
      </div>
    );
  }

  renderProfileCards() {
    const { majorAdmins, goToUser } = this.props;

    return (
      <div style={styles.cardsWrapper}>
        {majorAdmins.map(user => (
          <ProfileCard
            key={user.id}
            user={user}
            onClick={() => goToUser(user.id)}
            style={styles.adminCard}
            hoverable
          />
        ))}
      </div>
    );
  }

  render() {
    const { majorAdmins, intl: { formatMessage: t } } = this.props;

    if (isEmpty(majorAdmins)) {
      return <Spinner />;
    }

    return (
      <div>
        <h1>{t({ id: 'admins' })}</h1>
        {this.renderPaginationControls()}
        {this.renderProfileCards()}
        {this.renderPaginationControls()}
      </div>
    );
  }
}

export default injectIntl(MajorAdmins);
