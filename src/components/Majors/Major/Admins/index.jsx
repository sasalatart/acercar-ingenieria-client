import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../../containers/Layout/Pagination';
import Title from '../../../Layout/Title';
import ActionBar from './ActionBar';
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
}) {
  return (
    <Fragment>
      <ActionBar majorId={majorId} hasAdmins={majorAdmins.length > 0} />
      <Title><FormattedMessage id="majors.admins" /></Title>

      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(majorAdmins)}
        loadFn={loadAdmins}
        render={() => renderProfileCards(majorAdmins, goToUser)}
      />
    </Fragment>
  );
}

MajorAdmins.propTypes = {
  loading: PropTypes.bool.isRequired,
  majorId: PropTypes.number.isRequired,
  pagination: paginationShape,
  majorAdmins: PropTypes.arrayOf(userShape),
  loadAdmins: PropTypes.func.isRequired,
  goToUser: PropTypes.func.isRequired,
};

MajorAdmins.defaultProps = {
  pagination: undefined,
  majorAdmins: [],
};

export default MajorAdmins;
