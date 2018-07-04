import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noop from 'lodash/noop';
import Hideable from '../Layout/Hideable';

const styles = {
  text: {
    marginLeft: '6px',
  },
  cursor: withPointer => ({
    cursor: withPointer ? 'pointer' : 'default',
  }),
};

function IconText({
  icon,
  text,
  withPointer,
  hideable,
  loading,
  onClick,
  iconStyle,
  style,
}) {
  const textTag = <span style={styles.text}>{text}</span>;
  return (
    <span style={{ ...style, ...styles.cursor(withPointer && !loading) }}>
      <FontAwesomeIcon
        icon={loading ? 'spinner' : icon}
        onClick={loading ? undefined : onClick}
        spin={loading}
        style={iconStyle}
      />
      {hideable
        ? <Hideable>{textTag}</Hideable>
        : <span>{textTag}</span>
      }
    </span>
  );
}

IconText.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  withPointer: PropTypes.bool,
  hideable: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  iconStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

IconText.defaultProps = {
  withPointer: false,
  hideable: false,
  loading: false,
  onClick: noop,
  iconStyle: undefined,
  style: undefined,
};

export default IconText;
