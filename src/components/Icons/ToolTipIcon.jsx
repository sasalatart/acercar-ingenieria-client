import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonLink from '../../containers/ButtonLink';

const styles = {
  cursor: withPointer => ({
    cursor: withPointer ? 'pointer' : 'default',
  }),
};

function ToolTipIcon({
  toolTip,
  icon,
  to,
  onClick,
  button,
  withPointer,
  loading,
  iconStyle,
  ...restProps
}) {
  const iconProps = {
    icon: loading ? 'spinner' : icon,
    spin: loading,
    style: { ...styles.cursor(withPointer || onClick || button), ...iconStyle },
  };

  if (!button) {
    return (
      <Tooltip title={toolTip}>
        <FontAwesomeIcon {...iconProps} onClick={onClick} />
      </Tooltip>
    );
  }

  const Component = to ? Radium(ButtonLink) : Radium(Button);
  return (
    <Tooltip title={toolTip}>
      <Component to={to} onClick={onClick} {...restProps}>
        <FontAwesomeIcon {...iconProps} />
      </Component>
    </Tooltip>
  );
}

ToolTipIcon.propTypes = {
  toolTip: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  button: PropTypes.bool,
  withPointer: PropTypes.bool,
  loading: PropTypes.bool,
  iconStyle: PropTypes.shape({}),
};

ToolTipIcon.defaultProps = {
  to: undefined,
  onClick: undefined,
  button: false,
  withPointer: false,
  loading: false,
  iconStyle: undefined,
};

export default ToolTipIcon;
