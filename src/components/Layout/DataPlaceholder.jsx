import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spin } from 'antd';

const styles = {
  textCentered: {
    textAlign: 'center',
  },
  spinner: {
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

function Spinner({ absolute, noData }) {
  if (noData) {
    return <h1 style={styles.textCentered}><FormattedMessage id="nothingHereYet" /></h1>;
  }

  return (
    <div style={absolute ? { ...styles.spinner, ...styles.absolute } : styles.spinner}>
      <Spin size="large" />
    </div>
  );
}

Spinner.propTypes = {
  noData: PropTypes.bool,
  absolute: PropTypes.bool,
};

Spinner.defaultProps = {
  noData: false,
  absolute: false,
};

export default Spinner;
