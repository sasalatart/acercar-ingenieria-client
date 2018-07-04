import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconText from './Icons/IconText';
import ToolTipIcon from './Icons/ToolTipIcon';
import HideableButton from './Icons/HideableButton';

function getType(active, danger) {
  if (danger) return 'danger';
  return active ? 'primary' : 'secondary';
}

function ToggleLoadingButton({
  icon,
  content,
  iconOnly,
  toolTipped,
  active,
  loading,
  disabled,
  size,
  danger,
  onClick,
  style,
}) {
  if (iconOnly) {
    const commonProps = {
      icon,
      loading,
      onClick,
      withPointer: !disabled,
    };

    return toolTipped
      ? <ToolTipIcon {...commonProps} toolTip={content} />
      : <IconText {...commonProps} text={content} hideable />;
  }

  const buttonProps = {
    type: getType(active, danger), disabled: disabled || loading, size, onClick, style,
  };
  const iconToRender = loading ? 'spinner' : icon;

  if (toolTipped) {
    return (
      <Tooltip title={content}>
        <Button {...buttonProps}>
          <FontAwesomeIcon icon={iconToRender} />
        </Button>
      </Tooltip>
    );
  }

  return <HideableButton icon={iconToRender} {...buttonProps}>{content}</HideableButton>;
}

ToggleLoadingButton.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  iconOnly: PropTypes.bool,
  toolTipped: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  danger: PropTypes.bool,
  style: PropTypes.shape({}),
};

ToggleLoadingButton.defaultProps = {
  iconOnly: false,
  toolTipped: false,
  active: false,
  disabled: false,
  size: 'default',
  danger: false,
  style: undefined,
};

export default ToggleLoadingButton;
