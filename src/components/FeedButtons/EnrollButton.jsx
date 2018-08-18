import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ToggleLoadingButton from '../Layout/ToggleLoadingButton';

function EnrollButton({ enrolledByCurrentUser, ...rest }) {
  return (
    <ToggleLoadingButton
      active={enrolledByCurrentUser}
      content={<FormattedMessage id={`notifications.${enrolledByCurrentUser ? 'off' : 'on'}`} />}
      icon={enrolledByCurrentUser ? ['fas', 'bell'] : ['far', 'bell-slash']}
      toolTipped
      {...rest}
    />
  );
}

EnrollButton.propTypes = {
  enrolledByCurrentUser: PropTypes.bool,
};

EnrollButton.defaultProps = {
  enrolledByCurrentUser: false,
};

export default EnrollButton;
