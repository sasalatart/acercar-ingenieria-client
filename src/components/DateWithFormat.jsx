import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';

function DateWithFormat({ dateString, withTime, style }) {
  const props = {
    value: new Date(dateString), year: '2-digit', month: '2-digit', day: '2-digit', style,
  };

  if (withTime) {
    Object.assign(props, { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <FormattedDate {...props}>
      {formattedNow => <span style={style}>{formattedNow}</span>}
    </FormattedDate>
  );
}

DateWithFormat.propTypes = {
  dateString: PropTypes.string.isRequired,
  withTime: PropTypes.bool,
  style: PropTypes.shape({}),
};

DateWithFormat.defaultProps = {
  withTime: false,
  style: {},
};

export default DateWithFormat;
