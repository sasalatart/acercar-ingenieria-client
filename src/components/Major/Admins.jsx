import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
import PaginationControls from '../../containers/Pagination';
import ProfileCard from '../Profile/Card';
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
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    majorAdmins: ImmutablePropTypes.setOf(userShape),
    loadMajorAdmins: PropTypes.func.isRequired,
    goToUser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorAdmins: undefined,
  }

  renderProfileCards = () => {
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
    const {
      loading, pagination, loadMajorAdmins, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <h1>{t({ id: 'admins' })}</h1>
        <PaginationControls
          pagination={pagination}
          loading={loading}
          loadFn={loadMajorAdmins}
          render={this.renderProfileCards}
        />
      </div>
    );
  }
}

export default injectIntl(MajorAdmins);
