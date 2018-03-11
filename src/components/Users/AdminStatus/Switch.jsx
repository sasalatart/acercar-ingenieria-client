import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

function AdminStatusSwitch({
  updating, label, active, onChange,
}) {
  return (
    <div style={styles.container}>
      <p>{label}</p>
      <Switch checked={active} loading={updating} disabled={updating} onChange={onChange} />
    </div>
  );
}

AdminStatusSwitch.propTypes = {
  updating: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AdminStatusSwitch;
