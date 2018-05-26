import React from 'react';
import PropTypes from 'prop-types';
import IconText from './IconText';
import HideableButton from './HideableButton';

function ToggleLoadingButton({
  loading,
  active,
  content,
  activeIcon,
  inactiveIcon,
  onClick,
  iconOnly,
  size,
  disabled,
  style,
}) {
  if (loading) {
    return iconOnly
      ? <IconText type="loading" text={content} hideable />
      : <HideableButton type="primary" icon="loading" size={size} style={style}>{content}</HideableButton>;
  }

  const icon = active ? activeIcon : inactiveIcon;

  if (iconOnly) {
    return (
      <IconText
        type={icon}
        text={content}
        onClick={onClick}
        withPointer={!disabled}
        hideable
      />
    );
  }

  const type = active ? 'primary' : 'secondary';
  return (
    <HideableButton
      type={type}
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
  disabled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  active: PropTypes.bool,
  activeIcon: PropTypes.string.isRequired,
  inactiveIcon: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  iconOnly: PropTypes.bool,
  size: PropTypes.string,
  style: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
};

ToggleLoadingButton.defaultProps = {
  disabled: false,
  active: false,
  iconOnly: false,
  size: 'default',
  style: undefined,
};

export default ToggleLoadingButton;
