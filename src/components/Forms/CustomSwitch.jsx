import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';
import { Switch } from 'antd';

const styles = {
  label: {
    marginRight: '5px',
  },
};

function CustomSwitch({
  input, meta, label, wrapperStyle, ...rest
}) {
  return (
    <span style={wrapperStyle}>
      <span style={styles.label}>{label}</span>
      <Switch {...rest} checked={!!input.value} onChange={input.onChange} />
    </span>
  );
}

CustomSwitch.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  wrapperStyle: PropTypes.shape({}),
};

CustomSwitch.defaultProps = {
  wrapperStyle: {},
};

export default CustomSwitch;
