import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
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
    defaultPage: PropTypes.number.isRequired,
    pagination: paginationShape,
    majorAdmins: ImmutablePropTypes.setOf(userShape),
    loadMajorAdmins: PropTypes.func.isRequired,
    goToUser: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorAdmins: undefined,
  }

  componentWillMount() {
    const { majorId, defaultPage, loadMajorAdmins } = this.props;
    loadMajorAdmins(majorId, defaultPage);
  }

  handlePageChange = (page) => {
    const { majorId, loadMajorAdmins, addQueryToCurrentUri } = this.props;
    addQueryToCurrentUri({ page });
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

    if (!majorAdmins || majorAdmins.isEmpty()) {
      return <Spinner />;
    }

    return (
      <div>
        <h1>{t({ id: 'admins' })}</h1>
        <PaginationControls pagination={pagination} onPageChange={this.handlePageChange}>
          {this.renderProfileCards()}
        </PaginationControls>
      </div>
    );
  }
}

export default injectIntl(MajorAdmins);
