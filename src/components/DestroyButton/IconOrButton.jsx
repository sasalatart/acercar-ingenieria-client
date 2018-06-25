import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import noop from 'lodash/noop';
import ToolTipIcon from '../Icons/ToolTipIcon';
import HideableButton from '../Icons/HideableButton';

function DestroyIconOrButton({
  loading,
  iconOnly,
  label,
  onClick,
  intl: { formatMessage: t },
}) {
  const text = label || t({ id: 'forms.delete' });
  const commonProps = { icon: 'trash-alt', onClick, loading };

  if (iconOnly) {
    return <ToolTipIcon toolTip={text} withPointer={!loading} {...commonProps} />;
  }

  return (
    <HideableButton type="danger" {...commonProps}>
      {text}
    </HideableButton>
  );
}

DestroyIconOrButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  iconOnly: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  intl: intlShape.isRequired,
};

DestroyIconOrButton.defaultProps = {
  label: undefined,
  onClick: noop,
};

export default injectIntl(DestroyIconOrButton);
