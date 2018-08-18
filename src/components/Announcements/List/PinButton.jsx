import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ToolTipIcon from '../../Icons/ToolTipIcon';
import { colors } from '../../../theme';

const styles = {
  pinned: {
    color: colors.starred,
  },
};

function PinButton({ loading, pinned, onUpdate }) {
  const tooltip = <FormattedMessage id={`announcements.${pinned ? 'unpin' : 'pin'}`} />;
  return (
    <ToolTipIcon
      icon={[pinned ? 'fas' : 'far', 'star']}
      toolTip={tooltip}
      onClick={onUpdate}
      loading={loading}
      iconStyle={pinned ? styles.pinned : undefined}
      withPointer
    />
  );
}

PinButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  pinned: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PinButton;
