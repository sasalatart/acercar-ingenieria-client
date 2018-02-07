import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

function LocaleSelect({ locale, setLocale }) {
  return (
    <Select defaultValue={locale} onChange={setLocale}>
      <Select.Option value="es-ES">es-ES</Select.Option>
      <Select.Option value="en-US">en-US</Select.Option>
    </Select>
  );
}

LocaleSelect.propTypes = {
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};

export default LocaleSelect;
