import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ToolTipIcon from '../../Icons/ToolTipIcon';
import { colors } from '../../../theme';

const styles = {
  pinned: {
    color: colors.starred,
  },
};

function PinButton({
  loading,
  pinned,
  onUpdate,
  intl: { formatMessage: t },
}) {
  const pinType = pinned ? 'fas' : 'far';
  const tooltip = t({ id: `announcements.${pinned ? 'unpin' : 'pin'}` });

  return (
    <ToolTipIcon
      icon={[pinType, 'star']}
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
  intl: intlShape.isRequired,
};

export default injectIntl(PinButton);
