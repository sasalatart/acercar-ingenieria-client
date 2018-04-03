import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import ButtonLink from '../containers/ButtonLink';
import Hideable from './Layout/Hideable';
import { breakpointsKeys } from '../theme';

function HideableButton({
  breakpoint,
  icon,
  to,
  style,
  children,
  ...rest
}) {
  const Component = to ? ButtonLink : Button;

  return (
    <Component icon={icon} to={to} style={style} {...rest}>
      <Hideable breakpoint={breakpoint}>
        {children}
      </Hideable>
    </Component>
  );
}

HideableButton.propTypes = {
  breakpoint: PropTypes.oneOf(Object.keys(breakpointsKeys)),
  icon: PropTypes.string.isRequired,
  to: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

HideableButton.defaultProps = {
  breakpoint: breakpointsKeys.sm,
  to: undefined,
  style: undefined,
};

export default HideableButton;
