import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Alert } from 'antd';
import withModal from '../../hoc/withModal';
import ReportForm from '../../containers/Reports/Form';
import HideableButton from '../Icons/HideableButton';

const styles = {
  alert: {
    marginBottom: '25px',
  },
};

function ReportButton({
  id,
  collection,
  renderModal,
  onModalOpen,
  onModalClose,
  intl: { formatMessage: t },
}) {
  const modalContents = (
    <Fragment>
      <Alert
        type="info"
        message={t({ id: 'instructions' })}
        description={t({ id: 'reports.instructions' })}
        style={styles.alert}
        showIcon
      />

      <ReportForm id={id} collection={collection} callback={onModalClose} />
    </Fragment>
  );

  return (
    <Fragment>
      <HideableButton onClick={onModalOpen} icon="exclamation-circle">
        {t({ id: 'report' })}
      </HideableButton>

      {renderModal(t({ id: 'reports.sendForm' }), modalContents)}
    </Fragment>
  );
}

ReportButton.propTypes = {
  id: PropTypes.number.isRequired,
  collection: PropTypes.string.isRequired,
  renderModal: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withModal(ReportButton));
