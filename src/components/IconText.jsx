import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import noop from 'lodash/noop';
import Hideable from './Layout/Hideable';

const styles = {
  text: {
    marginLeft: '6px',
  },
  cursor: withPointer => ({
    cursor: withPointer ? 'pointer' : 'default',
  }),
};

function IconText({
  type, text, withPointer, hideable, onClick, style,
}) {
  const textTag = <span style={styles.text}>{text}</span>;

  return (
    <span style={{ ...style, ...styles.cursor(withPointer) }}>
      <Icon type={type} onClick={onClick} />
      {hideable
        ? <Hideable>{textTag}</Hideable>
        : <span>{textTag}</span>
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
