import React from 'react';
import PropTypes from 'prop-types';
import IconText from './Icons/IconText';
import ToolTipIcon from './Icons/ToolTipIcon';
import HideableButton from './Icons/HideableButton';

function renderIconOnly(toolTipped, commonProps, content) {
  return toolTipped
    ? <ToolTipIcon {...commonProps} toolTip={content} />
    : <IconText {...commonProps} text={content} hideable />;
}

function ToggleLoadingButton({
  icon,
  content,
  loading,
  iconOnly,
  toolTipped,
  active,
  disabled,
  size,
  onClick,
  style,
}) {
  if (loading && iconOnly) {
    const commonProps = { icon: 'spinner', loading: true };
    return renderIconOnly(toolTipped, commonProps, content);
  } else if (loading) {
    return (
      <HideableButton
        type="primary"
        icon="spinner"
        size={size}
        style={style}
        disabled
        loading
      >
        {content}
      </HideableButton>
    );
  }

  if (iconOnly) {
    const commonProps = { icon, onClick, withPointer: !disabled };
    return renderIconOnly(toolTipped, commonProps, content);
  }

  return (
    <HideableButton
      type={active ? 'primary' : 'secondary'}
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      size={size}
      style={style}
    >
      {content}
    </HideableButton>
  );
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
  loading: PropTypes.bool.isRequired,
  iconOnly: PropTypes.bool,
  toolTipped: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

ToggleLoadingButton.defaultProps = {
  iconOnly: false,
  toolTipped: false,
  active: false,
  disabled: false,
  size: 'default',
  style: undefined,
};

export default ToggleLoadingButton;
