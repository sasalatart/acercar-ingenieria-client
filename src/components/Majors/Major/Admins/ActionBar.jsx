import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Modal, Alert } from 'antd';
import WithModal from '../../../../hoc/WithModal';
import ActionBar from '../../../../containers/Layout/ActionBar';
import EmailForm from '../../../../containers/Majors/Major/Email/Form';
import HideableButton from '../../../HideableButton';

const styles = {
  alert: {
    marginBottom: '24px',
  },
};

function MajorAdminsActionBar({
  majorId,
  hasAdmins,
  modalVisible,
  onModalOpen,
  onModalClose,
  intl: { formatMessage: t },
}) {
  const actions = [];

  if (hasAdmins) {
    const contactButton = (
      <HideableButton onClick={onModalOpen} icon="mail">
        {t({ id: 'majors.email.personal' })}
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return (
    <div>
      <ActionBar actions={actions} />

      <Modal
        title={t({ id: 'majors.email.personal' })}
        visible={modalVisible}
        footer={null}
        onCancel={onModalClose}
        destroyOnClose
      >
        <Alert
          type="info"
          message={t({ id: 'forms.beforeContactingAdmins.message' })}
          description={t({ id: 'forms.beforeContactingAdmins.description' })}
          style={styles.alert}
          showIcon
        />

        <EmailForm majorId={majorId} personal />
      </Modal>
    </div>
  );
}

MajorAdminsActionBar.propTypes = {
  majorId: PropTypes.number.isRequired,
  hasAdmins: PropTypes.bool.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithModal(MajorAdminsActionBar));
