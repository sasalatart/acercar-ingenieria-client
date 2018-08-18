import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'antd';
import withModal from '../../../../hoc/withModal';
import ActionBar from '../../../../containers/Layout/ActionBar';
import EmailForm from '../../../../containers/Majors/Major/Email/Form';
import HideableButton from '../../../Icons/HideableButton';

const styles = {
  alert: {
    marginBottom: '24px',
  },
};

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

function MajorAdminsActionBar({
  majorId,
  hasAdmins,
  onModalOpen,
  renderModal,
}) {
  const actions = [];

  if (hasAdmins) {
    const contactButton = (
      <HideableButton onClick={onModalOpen} icon="envelope">
        <FormattedMessage id="majors.email.personal" />
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return (
    <Fragment>
      <ActionBar actions={actions} />

      {renderModal(
        <FormattedMessage id="majors.email.personal" />,
        renderModalContents(majorId),
      )}
    </Fragment>
  );
}

MajorAdminsActionBar.propTypes = {
  majorId: PropTypes.number.isRequired,
  hasAdmins: PropTypes.bool.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired,
};

export default withModal(MajorAdminsActionBar);
