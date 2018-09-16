import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'antd';
import withModal from '../../../hoc/withModal';
import EmailForm from '../../../containers/Majors/Major/Email/Form';
import Pagination from '../../../containers/Layout/Pagination';
import ProfileCard from '../../Users/Profile/Card';
import HideableButton from '../../Icons/HideableButton';
import { paginationInfoShape, userShape } from '../../../shapes';

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

function getActions(hasAdmins, onModalOpen) {
  const actions = [];

  if (hasAdmins) {
    const contactButton = (
      <HideableButton onClick={onModalOpen} icon="envelope">
        <FormattedMessage id="majors.email.personal" />
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return actions;
}

function renderModalContents(majorId) {
  return (
    <Fragment>
      <Alert
        type="info"
        message={<FormattedMessage id="forms.beforeContactingAdmins.message" />}
        description={<FormattedMessage id="forms.beforeContactingAdmins.description" />}
        style={styles.alert}
        showIcon
      />

      <EmailForm majorId={majorId} personal />
    </Fragment>
  );
}

function MajorAdmins({
  majorId,
  loading,
  noData,
  majorAdmins,
  paginationInfo,
  loadAdmins: load,
  goToUser,
  onModalOpen,
  renderModal,
  renderHeader,
}) {
  const subtitle = <FormattedMessage id="majors.admins" />;
  const actions = getActions(majorAdmins.length > 0, onModalOpen);

  return (
    <Fragment>
      {renderHeader({ subtitle, actions })}

      <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
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
      </Pagination>

      {renderModal(
        <FormattedMessage id="majors.email.personal" />,
        renderModalContents(majorId),
      )}
    </Fragment>
  );
}

MajorAdmins.propTypes = {
  majorId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  noData: PropTypes.bool.isRequired,
  paginationInfo: paginationInfoShape.isRequired,
  majorAdmins: PropTypes.arrayOf(userShape).isRequired,
  loadAdmins: PropTypes.func.isRequired,
  goToUser: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired,
};

export default withModal(MajorAdmins);
