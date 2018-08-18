import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ToggleLoadingButton from './Layout/ToggleLoadingButton';

function ApprovalButton({ approved, ...rest }) {
  return (
    <ToggleLoadingButton
      active={approved}
      content={<FormattedMessage id={approved ? 'reject' : 'approve'} />}
      icon={approved ? 'lock' : 'unlock'}
      danger={approved}
      {...rest}
    />
  );
}

ApprovalButton.propTypes = {
  approved: PropTypes.bool.isRequired,
};

export default ApprovalButton;
