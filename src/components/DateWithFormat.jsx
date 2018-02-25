import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';

function DateWithFormat({ dateString, style }) {
  return (
    <FormattedDate
      value={new Date(dateString)}
      year="2-digit"
      month="2-digit"
      day="2-digit"
      style={style}
    >
      {formattedNow => <span style={style}>{formattedNow}</span>}
    </FormattedDate>
  );
}

DateWithFormat.propTypes = {
  dateString: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

DateWithFormat.defaultProps = {
  style: {},
};

export default DateWithFormat;
