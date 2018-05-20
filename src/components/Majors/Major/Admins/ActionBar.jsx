import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Alert } from 'antd';
import WithModal from '../../../../hoc/WithModal';
import ActionBar from '../../../../containers/Layout/ActionBar';
import EmailForm from '../../../../containers/Majors/Major/Email/Form';
import HideableButton from '../../../HideableButton';

const styles = {
  alert: {
    marginBottom: '24px',
  },
};

function renderModalContents(majorId, t) {
  return (
    <Fragment>
      <Alert
        type="info"
        message={t({ id: 'forms.beforeContactingAdmins.message' })}
        description={t({ id: 'forms.beforeContactingAdmins.description' })}
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
    <Fragment>
      <ActionBar actions={actions} />

      {renderModal(t({ id: 'majors.email.personal' }), renderModalContents(majorId, t))}
    </Fragment>
  );
}

MajorAdminsActionBar.propTypes = {
  majorId: PropTypes.number.isRequired,
  hasAdmins: PropTypes.bool.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithModal(MajorAdminsActionBar));
