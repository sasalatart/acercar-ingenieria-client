import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';
import ToolTipIcon from '../Icons/ToolTipIcon';
import HideableButton from '../Icons/HideableButton';

function DestroyIconOrButton({
  loading,
  iconOnly,
  label,
  onClick,
}) {
  const text = label || <FormattedMessage id="forms.delete" />;
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
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
};

DestroyIconOrButton.defaultProps = {
  label: undefined,
  onClick: noop,
};

export default DestroyIconOrButton;
