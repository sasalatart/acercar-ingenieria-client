import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
};

function Spinner({ absolute }) {
  return (
    <div style={absolute ? { ...styles.wrapper, ...styles.absolute } : styles.wrapper}>
      <Spin size="large" />
    </div>
  );
}

Spinner.propTypes = {
  absolute: PropTypes.bool,
};

Spinner.defaultProps = {
  absolute: false,
};

export default Spinner;
