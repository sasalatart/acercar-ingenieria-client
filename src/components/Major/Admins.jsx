import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../Pagination';
import ProfileCard from '../Profile/Card';
import Spinner from '../Spinner';
import { paginationShape, userShape } from '../../shapes';

const styles = {
  cardsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
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

  handlePageChange = (page) => {
    const { majorId, loadMajorAdmins, addQueryToMajorPath } = this.props;
    addQueryToMajorPath(majorId, { page });
    loadMajorAdmins(majorId, page);
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
    const { pagination, majorAdmins, intl: { formatMessage: t } } = this.props;

    if (isEmpty(majorAdmins)) {
      return <Spinner />;
    }

    return (
      <div>
        <h1>{t({ id: 'admins' })}</h1>
        <PaginationControls
          pagination={pagination}
          onPageChange={this.handlePageChange}
        >
          {this.renderProfileCards()}
        </PaginationControls>
      </div>
    );
  }
}

export default injectIntl(MajorAdmins);