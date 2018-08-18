import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

function RadioField(props) {
  const OptionType = props.button ? RadioButton : Radio;

  return (
    <RadioGroup {...props}>
      {props.radioOptions.map(({
        value, label, key, ...rest
      }) => <OptionType key={key} value={value} {...rest}>{label}</OptionType>)}
    </RadioGroup>
  );
}

RadioField.propTypes = {
  button: PropTypes.bool,
  radioOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
};

RadioField.defaultProps = {
  button: false,
};

export default RadioField;
