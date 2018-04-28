import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../../containers/Pagination';
import ActionBar from './ActionBar';
import Title from '../../../Layout/Title';
import ProfileCard from '../../../Users/Profile/Card';
import { paginationShape, userShape } from '../../../../shapes';

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

function renderProfileCards(majorAdmins, goToUser) {
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

function MajorAdmins({
  loading,
  majorId,
  majorAdmins,
  pagination,
  loadAdmins,
  goToUser,
  intl: { formatMessage: t },
}) {
  return (
    <div>
      <ActionBar majorId={majorId} hasAdmins={majorAdmins.length > 0} />
      <Title text={t({ id: 'majors.admins' })} />

      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(majorAdmins)}
        loadFn={loadAdmins}
        render={() => renderProfileCards(majorAdmins, goToUser)}
      />
    </div>
  );
}

MajorAdmins.propTypes = {
  loading: PropTypes.bool.isRequired,
  majorId: PropTypes.number.isRequired,
  pagination: paginationShape,
  majorAdmins: PropTypes.arrayOf(userShape),
  loadAdmins: PropTypes.func.isRequired,
  goToUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

MajorAdmins.defaultProps = {
  pagination: undefined,
  majorAdmins: [],
};

export default injectIntl(MajorAdmins);
