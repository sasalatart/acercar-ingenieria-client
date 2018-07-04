import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ToggleLoadingButton from './Layout/ToggleLoadingButton';

function ApprovalButton({ approved, intl: { formatMessage: t }, ...rest }) {
  return (
    <ToggleLoadingButton
      active={approved}
      content={approved ? t({ id: 'reject' }) : t({ id: 'approve' })}
      icon={approved ? 'lock' : 'unlock'}
      danger={approved}
      {...rest}
    />
  );
}

ApprovalButton.propTypes = {
  approved: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ApprovalButton);
