import React from 'react';
import PropTypes from 'prop-types';
import IconText from './IconText';
import HideableButton from './HideableButton';

function ToggleLoadingButton({
  enabled,
  loading,
  active,
  content,
  activeIcon,
  inactiveIcon,
  onClick,
  iconOnly,
}) {
  if (loading) {
    return iconOnly
      ? <IconText type="loading" text={content} hideable />
      : <HideableButton type="primary" icon="loading">{content}</HideableButton>;
  }

  const icon = active ? activeIcon : inactiveIcon;

  if (iconOnly) {
    return (
      <IconText
        type={icon}
        text={content}
        onClick={onClick}
        withPointer={enabled}
        hideable
      />
    );
  }

  const type = active ? 'primary' : 'secondary';
  return (
    <HideableButton type={type} icon={icon} disabled={!enabled} onClick={onClick}>
      {content}
    </HideableButton>
  );
}

ToggleLoadingButton.propTypes = {
  enabled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  active: PropTypes.bool,
  activeIcon: PropTypes.string.isRequired,
  inactiveIcon: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  iconOnly: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ToggleLoadingButton.defaultProps = {
  enabled: true,
  active: false,
  iconOnly: false,
};

export default ToggleLoadingButton;