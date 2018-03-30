import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { breakpoints } from '../../theme';

const styles = {
  spaced: (padded) => {
    const property = padded ? 'padding' : 'margin';
    return {
      [property]: '0 75px',
      [breakpoints.sm]: {
        [property]: '0 15px',
      },
      [breakpoints.bg]: {
        [property]: '0 33px',
      },
    };
  },
};

function Spaced({ padded, style, children }) {
  return (
    <span style={{ ...style, ...styles.spaced(padded) }}>
      {children}
    </span>
  );
}

Spaced.propTypes = {
  padded: PropTypes.bool,
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

Spaced.defaultProps = {
  padded: false,
  style: undefined,
};

export default Radium(Spaced);
