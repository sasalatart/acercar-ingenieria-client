import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { breakpoints, breakpointsKeys } from '../../theme';

const styles = {
  hideable: breakpoint => ({
    [breakpoints[breakpoint]]: {
      display: 'none',
    },
  }),
};

function Hideable({ breakpoint, style, children }) {
  return (
    <span style={{ ...style, ...styles.hideable(breakpoint) }}>
      {children}
    </span>
  );
}

Hideable.propTypes = {
  breakpoint: PropTypes.oneOf(Object.keys(breakpointsKeys)),
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

Hideable.defaultProps = {
  breakpoint: breakpointsKeys.md,
  style: undefined,
};

export default Radium(Hideable);
