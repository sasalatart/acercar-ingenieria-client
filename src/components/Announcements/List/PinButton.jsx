import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

function PinButton({ loading, pinned, onUpdate }) {
  const pinType = pinned ? 'pushpin' : 'pushpin-o';

  return <Icon type={loading ? 'loading' : pinType} onClick={onUpdate} />;
}

PinButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  pinned: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PinButton;
