import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const styles = {
  icon: {
    marginRight: '8px',
  },
};

function IconText({ type, text }) {
  return (
    <span>
      <Icon type={type} style={styles.icon} />
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
};

export default IconText;
