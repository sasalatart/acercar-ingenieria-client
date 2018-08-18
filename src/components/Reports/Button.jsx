import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
}) {
  const modalContents = (
    <Fragment>
      <Alert
        type="info"
        message={<FormattedMessage id="instructions" />}
        description={<FormattedMessage id="reports.instructions" />}
        style={styles.alert}
        showIcon
      />

      <ReportForm id={id} collection={collection} callback={onModalClose} />
    </Fragment>
  );

  return (
    <Fragment>
      <HideableButton onClick={onModalOpen} icon="exclamation-circle">
        <FormattedMessage id="report" />
      </HideableButton>

      {renderModal(<FormattedMessage id="reports.sendForm" />, modalContents)}
    </Fragment>
  );
}

ReportButton.propTypes = {
  id: PropTypes.number.isRequired,
  collection: PropTypes.string.isRequired,
  renderModal: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,

};

export default withModal(ReportButton);
