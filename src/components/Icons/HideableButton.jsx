import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonLink from '../../containers/ButtonLink';
import Hideable from '../Layout/Hideable';
import { breakpointsKeys } from '../../theme';

const styles = {
  icon: breakpointKey => ({
    marginRight: '5px',
    [breakpointKey]: {
      marginRight: '1px',
    },
  }),
};

function HideableButton({
  breakpoint,
  icon,
  to,
  loading,
  children,
  ...rest
}) {
  const Component = to ? Radium(ButtonLink) : Radium(Button);
  return (
    <Component to={to} {...rest}>
      <FontAwesomeIcon
        icon={loading ? 'spinner' : icon}
        spin={loading}
        style={styles.icon(breakpoint)}
      />
      <Hideable breakpoint={breakpoint}>
        {children}
      </Hideable>
    </Component>
  );
}

HideableButton.propTypes = {
  breakpoint: PropTypes.oneOf(Object.keys(breakpointsKeys)),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  to: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

HideableButton.defaultProps = {
  breakpoint: breakpointsKeys.sm,
  to: undefined,
  loading: false,
};

export default HideableButton;
