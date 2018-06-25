import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import ToggleLoadingButton from '../ToggleLoadingButton';

function EnrollButton({ enrolledByCurrentUser, intl: { formatMessage: t }, ...rest }) {
  const contentState = enrolledByCurrentUser ? 'off' : 'on';

  return (
    <ToggleLoadingButton
      active={enrolledByCurrentUser}
      content={t({ id: `notifications.${contentState}` })}
      icon={enrolledByCurrentUser ? ['fas', 'bell'] : ['far', 'bell-slash']}
      toolTipped
      {...rest}
    />
  );
}

EnrollButton.propTypes = {
  enrolledByCurrentUser: PropTypes.bool,
  intl: intlShape.isRequired,
};

EnrollButton.defaultProps = {
  enrolledByCurrentUser: false,
};

export default EnrollButton;
