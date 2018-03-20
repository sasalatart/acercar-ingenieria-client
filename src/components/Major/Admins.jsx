import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../containers/Pagination';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
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
    majorAdmins: PropTypes.arrayOf(userShape),
    loadAdmins: PropTypes.func.isRequired,
    goToUser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorAdmins: [],
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
      loading, majorAdmins, pagination, loadAdmins, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <ActionBar />
        <Title text={t({ id: 'majors.admins' })} />

        <PaginationControls
          pagination={pagination}
          loading={loading}
          noData={!loading && isEmpty(majorAdmins)}
          loadFn={loadAdmins}
          render={this.renderProfileCards}
        />
      </div>
    );
  }
}

export default injectIntl(MajorAdmins);
