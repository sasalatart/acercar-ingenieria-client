import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import noop from 'lodash/noop';

const styles = {
  icon: {
    marginRight: '6px',
  },
};

function IconText({ type, text, onClick }) {
  return (
    <span>
      <Icon type={type} style={styles.icon} onClick={onClick} />
      {text}
    </span>
  );
}

IconText.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  onClick: PropTypes.func,
};

IconText.defaultProps = {
  onClick: noop,
};

export default IconText;
