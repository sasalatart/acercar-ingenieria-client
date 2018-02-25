import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { optionShape } from '../../shapes';

const { Option } = Select;

function CustomSelect(props) {
  return (
    <Select
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      {...props}
    >
      {props.options.map(({
        value, label, key, ...rest
      }) => <Option key={key} {...rest} value={value}>{label}</Option>)}
    </Select>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(optionShape).isRequired,
};

export default CustomSelect;
