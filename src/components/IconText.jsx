import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import noop from 'lodash/noop';
import Hideable from './Layout/Hideable';

const styles = {
  icon: {
    marginRight: '6px',
  },
  cursor: withPointer => ({
    cursor: withPointer ? 'pointer' : 'default',
  }),
};

function IconText({
  type, text, withPointer, hideable, onClick, style,
}) {
  return (
    <span style={{ ...style, ...styles.cursor(withPointer) }}>
      <Icon type={type} style={styles.icon} onClick={onClick} />
      {hideable
        ? <Hideable>{text}</Hideable>
        : <span>{text}</span>
      }
    </span>
  );
}

IconText.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  withPointer: PropTypes.bool,
  hideable: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
};

IconText.defaultProps = {
  withPointer: false,
  hideable: false,
  onClick: noop,
  style: undefined,
};

export default IconText;
