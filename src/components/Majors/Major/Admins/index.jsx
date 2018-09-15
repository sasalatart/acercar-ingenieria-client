import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import PaginationControls from '../../../../containers/Layout/Pagination';
import Title from '../../../Layout/Title';
import ActionBar from './ActionBar';
import ProfileCard from '../../../Users/Profile/Card';
import { paginationInfoShape, userShape } from '../../../../shapes';

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
  noData,
  majorId,
  majorAdmins,
  paginationInfo,
  loadAdmins,
  goToUser,
}) {
  return (
    <Fragment>
      <ActionBar majorId={majorId} hasAdmins={majorAdmins.length > 0} />
      <Title><FormattedMessage id="majors.admins" /></Title>

      <PaginationControls
        paginationInfo={paginationInfo}
        loading={loading}
        noData={noData}
        loadFn={loadAdmins}
        render={() => renderProfileCards(majorAdmins, goToUser)}
      />
    </Fragment>
  );
}

MajorAdmins.propTypes = {
  loading: PropTypes.bool.isRequired,
  noData: PropTypes.bool.isRequired,
  majorId: PropTypes.number.isRequired,
  paginationInfo: paginationInfoShape.isRequired,
  majorAdmins: PropTypes.arrayOf(userShape).isRequired,
  loadAdmins: PropTypes.func.isRequired,
  goToUser: PropTypes.func.isRequired,
};

export default MajorAdmins;
