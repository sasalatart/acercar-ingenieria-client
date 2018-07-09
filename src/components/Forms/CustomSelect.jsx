import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { optionShape } from '../../shapes';

const { Option } = Select;

function filter(input, option) {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

function renderOption(option) {
  const {
    value, label, key, ...rest
  } = option;
  return <Option key={key} {...rest} value={value}>{label}</Option>;
}

export default function CustomSelect(props) {
  return (
    <Select optionFilterProp="children" filterOption={filter} {...props}>
      {props.options.map(renderOption)}
    </Select>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(optionShape).isRequired,
};

function reduceValue(value = []) {
  if (value.length === 0) return '';
  return value.reduce((tags, tag) => `${tags}, ${tag}`);
}

export function CustomTagsSelect(props) {
  const {
    mode,
    value,
    onChange,
    onBlur,
    options,
  } = props;

  return (
    <Select
      mode={mode}
      tokenSeparators={[', ']}
      optionFilterProp="children"
      filterOption={filter}
      {...props}
      value={value && value.split(', ')}
      onBlur={newValue => onBlur(reduceValue(newValue))}
      onChange={newValue => onChange(reduceValue(newValue))}
    >
      {options.map(renderOption)}
    </Select>
  );
}

CustomTagsSelect.propTypes = {
  mode: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(optionShape).isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomTagsSelect.defaultProps = {
  mode: 'tags',
  value: undefined,
};
